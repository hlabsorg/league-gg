"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/browser";

const supabase = getBrowserClient();

export default function EmailConfirmationPage() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkConfirmationStatus = async () => {
      try {
        //Retrieves session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        //Error check
        if (sessionError) {
          console.error("Session error", sessionError);
          setStatus("error");
          setMessage("An error occurred while checking session info, please try signing in again.");
        }
        //If there is a confirmed user and signed in
        if (session?.user) {
          setUser(session.user);
          setStatus("success");
          setMessage("Email has been confirmed. Welcome to Elovate.gg.");
        } else {
          const error = searchParams.get("error");
          const errorDescription = searchParams.get("error_description");

          //If theres an error with confirmation
          if (error) {
            setStatus("error");
            setMessage(errorDescription || "Email confirmation error.");
          }
        }
      } catch (err) {
        console.error("Confirmation check error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    checkConfirmationStatus();

    //listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        setStatus("success");
        setMessage("Email has been confirmed. Welcome to Elovate.gg.");
      }
    });

    return () => subscription.unsubscribe();
  }, [searchParams]);

  const handleContinue = () => {
    if (user) {
      router.push("/profile");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center rounded-md border-2 border-border">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            {status === "loading" && (
              <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            )}
            {status === "success" && (
              <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
                <svg className="size-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {status === "error" && (
              <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
                <svg className="size-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="mb-4 text-2xl font-bold">
            {status === "loading" && "Confirming Your Email..."}
            {status === "success" && "Email Confirmed!"}
            {status === "error" && "Confirmation Failed"}
          </h1>

          <p className="mb-6 text-muted-foreground">{message}</p>

          <div className="space-y-3">
            {status === "success" && (
              <button
                onClick={handleContinue}
                className="w-full rounded-md bg-primary p-3 text-foreground transition-colors hover:bg-primary"
              >
                Continue to {user ? "Profile" : "Sign In"}
              </button>
            )}

            <div className="flex space-x-2">
              <Link href="/" className="flex-1 text-center text-sm text-primary hover:underline">
                Home
              </Link>
              <Link href="/profile" className="flex-1 text-center text-sm text-primary hover:underline">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
