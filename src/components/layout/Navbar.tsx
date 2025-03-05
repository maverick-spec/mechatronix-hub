
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Team Up", href: "/team-up" },
  { name: "Community", href: "/community" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-90"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-mechatronix-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <span className="font-bold text-lg md:text-xl">MechatronixHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-3 py-2 text-sm text-foreground/90 hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Button size="sm" className="ml-2 bg-mechatronix-600 hover:bg-mechatronix-700">
            Sign Up
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out pt-20",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="container px-4 py-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-3 text-lg border-b border-border hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="mt-4 bg-mechatronix-600 hover:bg-mechatronix-700">
              Sign Up
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
