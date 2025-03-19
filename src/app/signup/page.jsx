"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { getBrowserClient } from "@/lib/supabase/browser";

const supabase = getBrowserClient();

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          socialLayout="horizontal"
          view="sign_up" // Explicitly set to sign up
        />
      </div>
    </div>
  );
};

export default SignUpPage;
