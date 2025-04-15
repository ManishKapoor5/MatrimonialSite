
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-serif font-semibold text-primary">HeartMatch</h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition">Home</Link>
          <Link to="/search" className="text-foreground/80 hover:text-primary transition">Search</Link>
          <Link to="/success-stories" className="text-foreground/80 hover:text-primary transition">Success Stories</Link>
          <Link to="/premium" className="text-primary font-medium">Premium</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
