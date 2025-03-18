import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background py-3">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-primary/90">
          League GG
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex md:gap-6">
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact Us
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Help
            </Link>
          </div>
          <Button asChild className="rounded-full">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
