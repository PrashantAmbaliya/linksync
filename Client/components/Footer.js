import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='fixed bottom-1 w-full flex items-center justify-center'>
      <Link href="/" className="flex items-center justify-center py-1">
                <img src="/images/favicon.ico" className="hover:rotate-180 h-5 mr-2 transition ease-in-out delay-120" alt="Company Logo" />
                <span className="self-center text-md font-bold whitespace-nowrap hover:text-gray-200 dark:text-white font-medium">LinkSync</span>
            </Link>
    </footer>
  )
}

export default Footer