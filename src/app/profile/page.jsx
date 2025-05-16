import React from 'react';
import { getServerClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/logout-button';

const ProfilePage = async () => {
    const supabase = await getServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.log('Error fetching user profile:', error);
        return <div className="text-red-500">Error loading profile</div>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Basic info</h1>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="text"
                        value={user.email}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <button className="text-blue-500 ">
                        Set a new password
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <p>{data.username}</p>
                    </div>
                    <button className="text-blue-500 ">Edit</button>
                </div>
                <LogoutButton />

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Apps</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <g clip-path="url(#riot_svg__a)">
                                            <path fill="#E21215" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"></path>
                                            <path fill="#F1F5F1" d="M10.266 4.993 4.216 7.79l1.507 5.737 1.153-.144-.321-3.601.382-.17.648 3.683 1.958-.24-.348-3.976.368-.164.716 4.052 1.985-.245-.381-4.36.375-.163.784 4.427L15 12.387V6.18l-4.734-1.187ZM10.41 13.683l.095.566L15 15v-1.875l-4.584.56h-.007Z"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="riot_svg__a">
                                                <path fill="#fff" d="M0 0h20v20H0z"></path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Riot Games</p>
                                    <p className="text-sm text-gray-500">Not connected</p>
                                </div>
                            </div>
                            <button className="text-blue-500 hover:underline">Connect</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;