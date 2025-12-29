import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Indian citizens with AI-driven civic assistance, making government services accessible, transparent, and accountable for everyone.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Secure & Anonymous",
              description: "Report issues anonymously with end-to-end encryption protecting your identity",
            },
            {
              icon: Users,
              title: "Community Driven",
              description: "Join thousands of citizens working together for better governance",
            },
            {
              icon: TrendingUp,
              title: "Real Impact",
              description: "Track issue resolution and see tangible changes in your community",
            },
            {
              icon: Lock,
              title: "Privacy First",
              description: "Your data is protected with industry-standard security measures",
            },
          ].map((feature, idx) => (
            <Card key={idx} className="shadow-card hover:shadow-card-hover transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-accent py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join Janmitra today and become part of the movement towards better civic governance in India
          </p>
          <a 
            href="/auth"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors shadow-card-hover"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
