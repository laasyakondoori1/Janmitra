import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";

interface User {
  id: string;
  email: string;
  user_metadata?: any;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user in localStorage (from mock auth)
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-background/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
              <span className="text-2xl">🇮🇳</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Janmitra 2.0</h1>
              <p className="text-xs text-muted-foreground">Digital Citizen Ally</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className="hidden sm:flex"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/chat")}
                  className="hidden sm:flex"
                >
                  AI Assistant
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/report")}
                  className="hidden sm:flex"
                >
                  Report Issue
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/rights")}
                  className="hidden sm:flex"
                >
                  Learn Rights
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/rights")}
                  className="hidden sm:flex"
                >
                  Learn Rights
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;