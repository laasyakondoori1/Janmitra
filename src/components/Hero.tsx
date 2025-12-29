import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, BookOpen, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-hero py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-primary-foreground font-semibold">🇮🇳 Empowering Indian Citizens</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Janmitra 2.0
            <br />
            <span className="text-4xl md:text-5xl">Your Digital Citizen Ally</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            AI-powered civic assistance platform helping you understand, report, and act on legal and governance issues with multilingual support
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-white text-primary hover:bg-white/90 shadow-card-hover transition-all duration-300 text-lg px-8"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/rights")}
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
            >
              Learn Your Rights
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            {
              icon: MessageCircle,
              title: "AI Assistant",
              description: "Get instant help in your language",
              color: "text-white"
            },
            {
              icon: FileText,
              title: "Report Issues",
              description: "Submit complaints anonymously",
              color: "text-white"
            },
            {
              icon: BookOpen,
              title: "Learn Rights",
              description: "Understand your civic rights",
              color: "text-white"
            },
            {
              icon: BarChart3,
              title: "Track Progress",
              description: "Monitor issue resolution",
              color: "text-white"
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-card hover:shadow-card-hover transform hover:-translate-y-1"
            >
              <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;