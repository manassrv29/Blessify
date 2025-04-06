"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const routes = [
        { href: "/", label: "Home" },
        { href: "/journal", label: "Journal" },
        { href: "/mantras", label: "Mantras" },
        { href: "/reflection", label: "Reflection" },
        { href: "/stories", label: "Stories" },
        { href: "/study-jam", label: "Study Jam" },
        { href: "/memories", label: "Memories" },
        { href: "/gallery", label: "Gallery" },
        { href: "/chat", label: "Chat Assistant" },
    ];
    return (<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            Blessify
          </span>
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (<Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === route.href ? "text-primary" : "text-muted-foreground")}>
              {route.label}
            </Link>))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (<div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            {routes.map((route) => (<Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary p-2 rounded-md", pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground")} onClick={() => setIsMenuOpen(false)}>
                {route.label}
              </Link>))}
            <div className="flex items-center gap-4 pt-4 border-t">
              <ModeToggle />
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>)}
    </header>);
}
