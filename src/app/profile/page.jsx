"use client";
import React from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const ProfilePage = () => {
    const mockUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software developer and avid gamer.',
    };

    const handleLogout = async () => {
        const supabase = await getBrowserClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            console.log('Successfully logged out');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Profile Page</h1>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>{mockUser.name}</h2>
                <p><strong>Email:</strong> {mockUser.email}</p>
                <p><strong>Bio:</strong> {mockUser.bio}</p>
                <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;