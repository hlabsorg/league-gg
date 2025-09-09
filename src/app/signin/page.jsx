"use client";

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

const supabase = getBrowserClient();

const SignInPage = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(`/auth/confirm`);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/profile");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center rounded-md border-2 border-border">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md">
        <h1 className="text-font-bold mb-6 text-center text-2xl">Welcome Back</h1>

        <Auth
          view="sign_in"
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
          socialLayout="horizontal"
          showLinks={false}
          onlyThirdPartyProviders={false}
          redirectTo={redirectUrl}
        />

        <div className="mt-4 space-y-2">
          <Link href="/forgot-password" className="block w-full text-center text-sm text-primary hover:underline">
            Forgot your password?
          </Link>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
