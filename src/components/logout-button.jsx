"use client";

import { getBrowserClient } from '@/lib/supabase/browser';
import { redirect } from 'next/navigation';

export const LogoutButton = () => {

  const handleLogout = async () => {
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    } else {
      redirect('/') // Navigate to the home page after logout
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Logout
    </button>
  );
};