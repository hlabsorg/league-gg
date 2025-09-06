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
  const [view, setView] = useState("sign_in");
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
        <h1 className="text-font-bold mb-6 text-center text-2xl">
          {view === "sign_in" ? "Welcome Back" : "Reset Password"}
        </h1>

        <Auth
          view={view}
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
          {view === "sign_in" && (
            <>
              <button
                onClick={() => setView("forgotten_password")}
                className="w-full text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </>
          )}

          {view === "forgotten_password" && (
            <button onClick={() => setView("sign_in")} className="w-full text-sm text-primary hover:underline">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
