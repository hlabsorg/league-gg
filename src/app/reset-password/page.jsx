"use client";

import React, { useState, useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

const supabase = getBrowserClient();

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  //Check to see if the user has a valid session for password reset
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
        setMessage("Password updated successfully! Redirecting to profile ...");
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
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
        <h1 className="text-center text-2xl font-bold mb-6">Reset Password</h1>

        {error && <div className="mb-4 p-3 bg-red-100 border border-destructive text-destructive rounded">{error}</div>}

        {message && <div className="mb-4 p-3 bg-green-100 border border-accent text-accent rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-black"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-black"
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
            className="w-full bg-primary text-foreground p-2 rounded-md hover:bg-primary disabled:bg-muted disabled:cursor-not-allowed"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleCancel} className="text-primary hover:text-primary text-sm">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
