"use client";

import React, { useState, useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabase = getBrowserClient();

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setError("Invalid or expired reset link. Please request a new password reset.");
        }
      } catch (err) {
        setError("An error occurred during validation");
      }
    };

    checkSession();
  }, []);

  //Password requirements
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };
  //Check to see if passwords match
  const passwordMatch = password === confirmPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (!passwordMatch) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: password });

      if (updateError) {
        setError(updateError.message);
      } else {
        setMessage(
          <>
            Password updated successfully! Please{" "}
            <Link href="/signin" className="text-primary hover:underline">
              login
            </Link>{" "}
            with your new credentials.
          </>,
        );

        await supabase.auth.signOut();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/signin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center rounded-md border-2 border-border">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Reset Password</h1>

        {error && <div className="mb-4 rounded border border-destructive bg-red-100 p-3 text-destructive">{error}</div>}

        {message && <div className="mb-4 rounded border border-accent bg-green-100 p-3 text-accent">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full rounded-md border border-border p-2 text-black focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              className="w-full rounded-md border border-border p-2 text-black focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {/* only shows when the confirm password field is filled out */}
          {confirmPassword && (
            <div className={`text-sm ${passwordMatch ? "text-accent" : "text-destructive"}`}>
              {passwordMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !passwordMatch}
            className="w-full rounded-md bg-primary p-2 text-foreground hover:bg-primary disabled:cursor-not-allowed disabled:bg-muted"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleCancel} className="text-sm text-primary hover:text-primary">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
