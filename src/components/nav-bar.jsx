import Link from "next/link";
import { getServerClient } from "@/lib/supabase/server";
import { AuthButtons } from "@/components/auth-buttons";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full border-b bg-background py-3">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src="/assets/elovate_logo.png"
              alt="Elovate Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>
          <h1 className="text-2xl font-bold ">Elovate.GG</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex md:gap-6">
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
          <AuthButtons initialUser={user} />
        </div>
      </div>
    </nav>
  );
}
