"use client";

import React, { useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";
import Link from "next/link";

const supabase = getBrowserClient();

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //pw reset api call
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm`,
    });
    setEmailSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center rounded-md border-2 border-border">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md">
        <div>
          <h1 className="mb-4 text-center text-2xl font-bold">Forgot Password?</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Enter your email and we'll send you reset instructions.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full text-black rounded-md border border-border p-3 focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-primary p-3 text-foreground hover:bg-primary disabled:bg-muted"
            >
              Send Reset Email
            </button>
          </form>
        </div>

        {emailSent && (
          <div className="mt-4 p-3 bg-green-100 border border-accent rounded text-accent text-sm">
            Password reset email sent! Please check your inbox.
          </div>
        )}

        <div className="mt-6 text-center space-y-2">
          <Link href="/signin" className="block text-sm text-primary hover:underline">
            Back to Sign In
          </Link>
          <Link href="/signup" className="block text-sm text-muted-foreground hover:text-primary">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
