import React from 'react'
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

export default function SocialMediaIcons({socialMedia}) {
    let socialMediaKeys = [];
    if(socialMedia){
        socialMediaKeys = Object.keys(socialMedia)
    }

    return (
        <div className='social flex items-center justify-center gap-2 '>
            {socialMedia && (
                socialMediaKeys.map((key) => (
                    socialMedia[key] ? (
                        <Link href={socialMedia[key]} className='shadow-md shadow-gray-500/50 rounded-full hover:scale-110 transition ease-in-out'>
                            <Avatar src={`/images/${key}.png`}/>
                        </Link>
                    ) : null
                ))
            )}
        </div>
    )
}
