import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    return new Response("Server configuration error", { status: 500 });
  }

  const openAISocket = new WebSocket(
    "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
    {
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "realtime=v1",
      },
    }
  );

  let sessionConfigured = false;

  openAISocket.onopen = () => {
    console.log("Connected to OpenAI Realtime API");
  };

  openAISocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("OpenAI event:", data.type);

      // Configure session after receiving session.created
      if (data.type === "session.created" && !sessionConfigured) {
        sessionConfigured = true;
        const sessionConfig = {
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            instructions: "You are Janmitra, a helpful AI assistant for Indian citizens. You help them understand their civic rights, government schemes, legal issues, and how to report problems to authorities. Provide accurate information about Indian laws, rights, and government services. Be empathetic and supportive. Guide users on proper channels for complaints and grievances. Explain legal concepts in simple language. Recommend relevant government schemes. Help users understand RTI processes. You can speak in multiple languages including English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Odia.",
            voice: "alloy",
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            input_audio_transcription: {
              model: "whisper-1",
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000,
            },
            temperature: 0.8,
            max_response_output_tokens: "inf",
          },
        };
        
        console.log("Sending session config");
        openAISocket.send(JSON.stringify(sessionConfig));
      }

      // Forward all messages to client
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
      }
    } catch (error) {
      console.error("Error processing OpenAI message:", error);
    }
  };

  openAISocket.onerror = (error) => {
    console.error("OpenAI WebSocket error:", error);
  };

  openAISocket.onclose = () => {
    console.log("OpenAI WebSocket closed");
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };

  socket.onmessage = (event) => {
    try {
      if (openAISocket.readyState === WebSocket.OPEN) {
        openAISocket.send(event.data);
      }
    } catch (error) {
      console.error("Error forwarding to OpenAI:", error);
    }
  };

  socket.onclose = () => {
    console.log("Client socket closed");
    if (openAISocket.readyState === WebSocket.OPEN) {
      openAISocket.close();
    }
  };

  socket.onerror = (error) => {
    console.error("Client socket error:", error);
  };

  return response;
});
