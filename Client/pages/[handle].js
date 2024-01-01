import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar'
import { toast } from 'react-toastify';
import Link from "next/link"
import SocialMediaIcons from "../components/SocialMediaIcons"
import copy from 'copy-to-clipboard';

export default function handle() {
    const [handleData, setHandleData] = useState()
    const [socialMedia, setSocialMedia] = useState();
    const [handleFound, setHandleFound] = useState(true)
    const router = useRouter();

    useEffect(() => {
        if (router.query?.handle) {
            fetch(`http://localhost:8000/get/${router.query.handle}`)
                .then((res) => {
                    if (res.status !== 200) {
                        setHandleFound(false)
                    }
                    return res.json()
                })
                .then((res) => {
                    setHandleData(res.data)
                    if (res.data.socialMedia) {
                        setSocialMedia(res.data.socialMedia)
                    }
                })
                .catch((error) => {
                    toast.error(error)
                })
        }
    }, [router.query]);

    function CopyLink() {
        copy(`linksync.to/${router.query?.handle}`)
        toast.success('Link Copied')
    }

    if (!handleFound) {
        return (
            <div className='h-screen flex flex-col items-center mt-24'>
                <img src="https://cdn-icons-png.flaticon.com/512/8626/8626269.png" className='h-[300px]' />
                <h1 className='text-3xl mt-5'>Handle Not Found!</h1>
            </div>
        )
    }

    return (
        <sectio className='w-screen flex justify-center'>
            <button onClick={CopyLink} className='bg-blue-700 flex items-center justify-center pl-3 absolute z-10 rounded-full left-10 top-20 hover:bg-blue-800 active:scale-95 shadow-md shadow-gray-500/50'>
                <p className='text-white font-medium'>Share</p>
                <Avatar src="/images/share.png" alt="Company Logo" className='p-2' />
            </button>
            <main className='w-screen max-w-screen-xl flex flex-col items-center justify-center pt-10 gap-4'>
                <div className='flex flex-col gap-1 items-center'>
                    <Avatar src={handleData?.avatar} sx={{ width: 100, height: 100 }} />
                    <h1 className='text-xl font-bold'>{handleData?.handle}</h1>
                    <p>{handleData?.bio}</p>
                </div>
                <SocialMediaIcons socialMedia={socialMedia} />
                <div className='flex flex-col gap-3 2xl:w-7/12 lg:w-3/5 md:w-3/5 w-10/12 text-white pb-3'>
                    {handleData?.links?.map((link) => (
                        <div className=' bg-blue-600 hover:bg-blue-700 transition ease-in-out rounded-full pl-1 shadow-md shadow-gray-500/50'>
                            <Link href={link.url} className='flex items-center gap-2 p-3'>
                                <img src={link.icon} className='h-[20px]'/>
                                <p>{link.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </sectio>
    )
}
