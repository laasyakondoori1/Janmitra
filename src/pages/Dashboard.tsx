import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { mockAuth } from "@/integrations/supabase/mock-auth";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, BookOpen, AlertCircle } from "lucide-react";

interface User {
  id: string;
  email: string;
  user_metadata?: any;
}

interface Issue {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Try to get user from mock auth first
    const storedUser = localStorage.getItem('current_user');
    
    if (!storedUser) {
      // No user found, redirect to auth
      console.log('No stored user found, redirecting to auth');
      setIsInitializing(false);
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser) as User;
      console.log('User found:', parsedUser);
      setUser(parsedUser);
      
      // Load user's issues from localStorage
      const userIssues = JSON.parse(localStorage.getItem('user_issues') || '[]');
      setIssues(userIssues);
    } catch (error) {
      console.error('Error parsing user:', error);
      setIsInitializing(false);
      navigate("/auth");
      return;
    } finally {
      setLoading(false);
      setIsInitializing(false);
    }
  }, [navigate]);

  // Listen for storage changes (user logout from other tabs, etc)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('current_user');
      if (!storedUser) {
        console.log('User was removed from storage, redirecting to auth');
        navigate("/auth");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    navigate("/auth");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-secondary";
      case "in_progress":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {isInitializing ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      ) : (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-xl text-muted-foreground">
            Your civic assistance dashboard
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card 
            className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-primary/20 bg-gradient-card"
            onClick={() => navigate("/chat")}
          >
            <CardHeader>
              <MessageCircle className="w-10 h-10 text-primary mb-2" />
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get instant civic help</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-secondary/20 bg-gradient-card"
            onClick={() => navigate("/report")}
          >
            <CardHeader>
              <FileText className="w-10 h-10 text-secondary mb-2" />
              <CardTitle>Report Issue</CardTitle>
              <CardDescription>Submit a new complaint</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-accent/20 bg-gradient-card"
            onClick={() => navigate("/rights")}
          >
            <CardHeader>
              <BookOpen className="w-10 h-10 text-accent mb-2" />
              <CardTitle>Learn Rights</CardTitle>
              <CardDescription>Understand your rights</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Issues */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Recent Reports</CardTitle>
            <CardDescription>Track your submitted issues</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : issues.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No issues reported yet</p>
                <Button onClick={() => navigate("/report")}>
                  Report Your First Issue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div 
                    key={issue.id} 
                    className="p-4 border border-border rounded-lg hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{issue.title}</h3>
                      <span className={`text-sm font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Category: {issue.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      )}
    </div>
  );
};

export default Dashboard;