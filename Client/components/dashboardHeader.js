import React, { useContext, useEffect } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useRouter } from 'next/router';
import Link from "next/link"
import UserContext from '@/context/userContext';


export default function DashboardHeader() {
  const { UserData, setUserData } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      return router.push('/login')
    }
    fetch(`https://linksync-server.onrender.com/data/dashbord`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        Token: localStorage.getItem('Token')
      })
    })
      .then((res) => { return res.json() })
      .then((res) => {
        setUserData(res.data)
      })
  }, [])


  const HandleLogout = () => {
    localStorage.removeItem('Token')
    router.push('/login');
  }

  return (
    <div className='flex justify-between flex-wrap gap-5'>
      <div className='flex gap-5'>
        <button onClick={() => router.push('/edit/links')} className='px-4 flex items-center gap-1 hover:scale-105 transition ease-in-out outline outline-2 outline-blue-700 rounded-lg hovor:scale-105'>
          <EditOutlinedIcon />
          <span>Edit Links</span>
        </button >
        <button onClick={() => router.push('/edit/profile')} className='text-white p-4 gap-1 flex items-center bg-blue-700 outline outline-2 outline-blue-700 rounded-lg hover:scale-105 transition ease-in-out'>
          <PersonIcon />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/${UserData?.handle}`} className='flex cursor-pointer items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg outline outline-1 outline-gray-300'>
          <span className='font-semibold'>{UserData?.username}</span>
          <Avatar alt="Remy Sharp" src={UserData?.avatar} />
        </Link>
        <div className='flex gap-1'>
          <button className='hover:bg-gray-200 p-3 rounded-full'>
            <NotificationsNoneOutlinedIcon fontSize='large' />
          </button>
          {/* <Divider orientation="vertical" flexItem /> */}
          <button onClick={HandleLogout} className='hover:bg-gray-200 p-3 rounded-full'>
            <LogoutRoundedIcon fontSize='large' />
          </button>
        </div>
      </div>

    </div>
  )
}
