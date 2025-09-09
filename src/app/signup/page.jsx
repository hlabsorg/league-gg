"use client";
import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = getBrowserClient();

const SignUpPage = () => {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/profile");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center rounded-md border-2 border-border">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md">
        <h1 className="text-font-bold text-center text-2xl">Sign Up</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
          socialLayout="horizontal"
          view="sign_up"
          showLinks={true}
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
