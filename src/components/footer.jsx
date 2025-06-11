import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Left side - Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary">
            League GG
          </Link>

          {/* Right side - Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Contact Us
            </Link>
            {/* <Link href="/help" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Help
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Terms of Use
            </Link> */}
          </nav>
        </div>

        <div className="my-8 border-t" />

        <div className="flex w-full items-start justify-between gap-4">
          <p className="text-sm text-muted-foreground ">
            © {new Date().getFullYear()} League GG. All rights reserved.
          </p>
          <p className="mx-4 max-w-3xl flex-1 text-sm text-muted-foreground">
            League GG is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone
            officially involved in producing or managing Riot Games properties. Riot Games and all associated properties
            are trademarks or registered trademarks of Riot Games, Inc
          </p>
          <p className="text-sm text-muted-foreground">Made for the League community</p>
        </div>
      </div>
    </footer>
  );
}
