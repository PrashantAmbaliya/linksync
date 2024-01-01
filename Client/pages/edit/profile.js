import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/userContext";
import DashboardHeader from "@/components/dashboardHeader";
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function profile() {
    const { UserData, setUserData } = useContext(UserContext);
    const router = useRouter()

    const socialMediaPlatforms = ['facebook', 'instagram', 'twitter', 'youtube', 'linkedin', 'github'];

    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [avatar, setAvatar] = useState();
    const [socialMedia, setSocialMedia] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        linkedin: '',
        github: ''
    });

    function handleSocialMedia(e, platform) {
        const updatedSocialMedia = { ...socialMedia, [platform]: e.target.value };
        setSocialMedia(updatedSocialMedia);
    }

    useEffect(() => {
        if (UserData) {
            setUsername(UserData.username)
            setBio(UserData.bio)
            setAvatar(UserData.avatar)
            setSocialMedia(UserData.socialMedia)
        }
    }, [UserData]);

    function handleProfileUpdate(e) {
        e.preventDefault();

        if (!localStorage.getItem('Token')) {
            return router.push('/login')
        }

        fetch('https://linksync-server.onrender.com/edit/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Token: localStorage.getItem('Token'), username, bio, avatar }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Somting went Wrong");
                }
                toast.success("Profile Updated");
                return res.json();
            })
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    function handleSocialMediaUpdate(e) {
        e.preventDefault();

        if (!localStorage.getItem('Token')) {
            return router.push('/login')
        }

        fetch('https://linksync-server.onrender.com/edit/socialmedia', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Token: localStorage.getItem('Token'), socialMedia }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Somting went Wrong");
                }
                toast.success("Social Media Updated");
                return res.json();
            })
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                toast.error(error);
            })
    }


    return (
        <div className="h-screen max-w-full flex flex-col gap-5 bg-gray-100 p-10">
            <DashboardHeader avatar={UserData?.avatar} handle={UserData?.name} />
            <main className="h-full flex items-center  flex-col gap-5 border border-2 bg-[#eeeeee] border-solid rounded-xl pt-5 gap-10">
                <section className="flex flex-col items-center gap-3 w-6/12">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <form onSubmit={handleProfileUpdate} className="w-full flex flex-col gap-3 pb-3">
                        <span className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black shadow-lg p-2 rounded-lg autofocus">
                            <PersonIcon />
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="focus:outline-none w-full" type="text" placeholder='set a Name' />
                        </span>
                        <span className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black shadow-lg p-2 rounded-lg autofocus">
                            <NotesIcon />
                            <input value={bio} onChange={(e) => setBio(e.target.value)} className="focus:outline-none w-full" type="text" placeholder='Enter Bio' />
                        </span>
                        <span className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black shadow-lg p-2 rounded-lg autofocus">
                            {avatar ? (<Avatar src={avatar} sx={{ width: 25, height: 25 }} />) : <ImageIcon />}
                            <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="focus:outline-none w-full" type="text" placeholder='Enter Profile Image Link' />
                        </span>
                        <button type='submit' className="bg-[#089637] hover:bg-[#0c7e32] text-white w-4/12 p-2 self-center rounded-lg font-medium shadow-lg mt-2">
                            Save Changes
                        </button>
                    </form>
                </section>
                <section className="flex flex-col items-center gap-3 w-6/12">
                    <h1 className="text-2xl font-bold">Edit Social Media</h1>
                    <form onSubmit={handleSocialMediaUpdate} className="w-full flex flex-col gap-3 pb-3">
                        {socialMediaPlatforms.map((platform) => (
                            <span key={platform} className="flex gap-2 items-center bg-white border-2 border-gray-100 text-black shadow-lg p-2 rounded-lg autofocus">
                                <Avatar src={`/images/${platform}.png`} sx={{ width: 25, height: 25 }} />
                                <input value={socialMedia[platform]} onChange={(e) => handleSocialMedia(e, platform)} className="focus:outline-none w-full" type="text" placeholder={`Set a ${platform} Link`} />
                            </span>
                        ))}
                        <button type='submit' className="bg-[#089637] hover:bg-[#0c7e32] text-white w-4/12 p-2 self-center rounded-lg font-medium shadow-lg mt-2">
                            Save Changes
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
