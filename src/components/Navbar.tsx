import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", label: "Ana Səhifə" },
    { href: "/projects", label: "Layihələr" },
    { href: "/articles", label: "Məqalələr" },
    { href: "/cv", label: "CV" },
    { href: "/contact", label: "Əlaqə" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Portfolio
          </Link>
          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-black/80",
                  location.pathname === link.href
                    ? "text-black after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-black"
                    : "text-black/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;