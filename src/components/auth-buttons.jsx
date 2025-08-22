"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { getBrowserClient } from "@/lib/supabase/browser";

export function AuthButtons({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const supabase = getBrowserClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return user ? (
    <Link href="/profile">
      <Avatar className="size-10 cursor-pointer hover:opacity-80">
        <AvatarFallback>
          <Icons.user className="size-5" />
        </AvatarFallback>
      </Avatar>
    </Link>
  ) : (
    <Button asChild className="rounded-full">
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}
