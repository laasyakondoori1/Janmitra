import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

interface RightsContent {
  id: string;
  title: string;
  content: string;
  category: string;
}

const Rights = () => {
  const [rightsContent, setRightsContent] = useState<RightsContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRights();
  }, []);

  const fetchRights = async () => {
    try {
      // Mock data for rights content
      const mockRights: RightsContent[] = [
        {
          id: "1",
          title: "Right to Information",
          content: "Every citizen has the right to seek information from government offices under the Right to Information Act. You can request official documents and records within 30 days.",
          category: "information"
        },
        {
          id: "2",
          title: "Right to Free and Fair Election",
          content: "All citizens have the right to participate in elections and vote freely. No one can be discriminated against based on caste, religion, or gender during elections.",
          category: "political"
        },
        {
          id: "3",
          title: "Right to Education",
          content: "Education is a fundamental right of every child. The government must provide free and compulsory education up to the age of 14 years.",
          category: "education"
        },
        {
          id: "4",
          title: "Right to Equality",
          content: "All citizens are equal before the law. No discrimination based on religion, caste, gender, birth, or residence is permitted.",
          category: "equality"
        },
        {
          id: "5",
          title: "Right to Freedom of Expression",
          content: "Citizens have the right to express their views and opinions freely, subject to reasonable restrictions in the interest of national security and public order.",
          category: "freedom"
        },
        {
          id: "6",
          title: "Right to Property",
          content: "Citizens have the right to acquire, hold, and dispose of property. The state can acquire property only for public purposes with fair compensation.",
          category: "property"
        }
      ];
      
      setRightsContent(mockRights);
    } catch (error) {
      console.error("Error fetching rights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold">Know Your Rights</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Civic Rights Education</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding your rights is the first step toward empowered citizenship
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Your Fundamental Rights</CardTitle>
            <CardDescription>
              Learn about your legal rights and how to exercise them
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : rightsContent.length === 0 ? (
              <p className="text-muted-foreground">No content available yet</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {rightsContent.map((item, index) => (
                  <AccordionItem key={item.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <span className="font-semibold">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-11 pr-4 text-muted-foreground leading-relaxed">
                        {item.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 p-8 bg-gradient-accent rounded-2xl text-center shadow-card">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Help Understanding Your Rights?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our AI assistant can answer your questions and guide you through complex legal topics
          </p>
          <a 
            href="/chat" 
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Ask Janmitra AI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Rights;