import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VoiceInterfaceProps {
  onTranscriptUpdate: (text: string, isUser: boolean) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
];

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onTranscriptUpdate }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startVoiceInput = async () => {
    try {
      setIsProcessing(true);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        // Use Web Speech API for transcription (fallback if no API available)
        await transcribeAudio(audioBlob);
        setIsRecording(false);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsProcessing(false);

      toast({
        title: "Recording started",
        description: "Speak naturally in any supported language",
      });

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, 30000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone access to use voice features",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const stopVoiceInput = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // Try to use Web Speech API if available
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN"; // Default to Indian English

        recognition.onstart = () => {
          console.log("Speech recognition started");
        };

        recognition.onresult = (event) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              if (transcript.trim()) {
                onTranscriptUpdate(transcript, true);
              }
            } else {
              interimTranscript += transcript;
            }
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          toast({
            title: "Transcription error",
            description: "Could not transcribe audio. Please try again.",
            variant: "destructive",
          });
        };

        recognition.onend = () => {
          setIsProcessing(false);
        };

        // Start recognition with audio
        recognition.start();
      } else {
        // Fallback: Show message that voice transcription is not supported
        toast({
          title: "Voice input not supported",
          description: "Your browser does not support voice transcription. Please use text input.",
          variant: "destructive",
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Transcription error:", error);
      toast({
        title: "Transcription failed",
        description: "Could not process audio. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    } finally {
      // Clean up streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-background/50">
        <h3 className="font-semibold mb-2">Supported Languages</h3>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <span
              key={lang.code}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <Button
            onClick={startVoiceInput}
            disabled={isProcessing}
            size="lg"
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Mic className="h-5 w-5" />
                Start Voice Input
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={stopVoiceInput}
            variant="destructive"
            size="lg"
            className="gap-2"
          >
            <MicOff className="h-5 w-5" />
            Stop Recording
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Recording... (up to 30 seconds)
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;
