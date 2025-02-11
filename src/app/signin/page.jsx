"use client";

// league-gg/src/app/signin/page.jsx
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { getBrowserClient } from '@/lib/supabase/browser';
import { ThemeSupa } from '@supabase/auth-ui-shared'

// Initialize Supabase client

const supabase = getBrowserClient()

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <Auth 
                    supabaseClient={supabase} 
                    providers={['google']} 
                    socialLayout="horizontal"
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    view="sign_in" // Explicitly set to sign in
                />
            </div>
        </div>
    );
};

export default SignInPage;