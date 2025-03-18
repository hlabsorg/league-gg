"use client";

// league-gg/src/app/signin/page.jsx
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { getBrowserClient } from "@/lib/supabase/browser";

// Initialize Supabase client

const supabase = getBrowserClient();

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          socialLayout="horizontal"
          view="sign_in" // Explicitly set to sign in
        />
      </div>
    </div>
  );
};

export default SignInPage;
