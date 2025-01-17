"use client";

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { getBrowserClient } from '@/lib/supabase/browser';

const supabase = getBrowserClient()

const SignUpPage = () => {
  return (
      <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-center">Sign Up</h1>
              <Auth 
                  supabaseClient={supabase} 
                  providers={['google']} 
                  socialLayout="horizontal"
                  view="sign_up" // Explicitly set to sign up
              />
          </div>
      </div>
  );
};

export default SignUpPage;