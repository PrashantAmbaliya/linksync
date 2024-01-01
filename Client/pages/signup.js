import React, { useState, useEffect } from 'react'
import Footer from "../components/Footer";
import styles from '../styles/apply.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Apply = () => {

  const [handle, setHandle] = useState('');
  const [usename, setusename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Router = useRouter();

  useEffect(() => {
    if (Router.query.handle) {
      setHandle(Router.query.handle);
    }
  }, [Router.query.handle]);

  function handleRegister(e) {
    e.preventDefault();

    fetch(`https://linksync-server.onrender.com/api/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ handle, email, password, usename })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if(res.status === 200) {
          toast.success("You are Registered Succesfully")
        }
        return res.json();
      })
      .then((data) => {
        Router.push('/login')
      })
      .catch((error) => {
        toast.error("Somthing went wrong")
      });
  }

  return (
    <>
      <section>
        <div className={styles.background + " main min-h-screen flex flex-col justify-center items-center"}>
          <div className="content bg-white text-black p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-center">Join Top Creators</h1>
            <p className="text-center mb-3">Create Link Manager for your brand</p>
            <div className="">
              <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <input value={handle} onChange={(e) => setHandle(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="text" placeholder='Social Handle Name' required />
                <input value={usename} onChange={(e) => setusename(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="text" placeholder='Username' required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="email" placeholder='Enter your email' required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="password" placeholder='Enter your password' required />
                <button className="bg-blue-700 mb-1 mt-4 transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg" type="submit">Create Account</button>
              </form>
            </div>
          </div>
          <h3 className='text-white mt-3'>Already Have Account? <Link href='/login' className='text-blue-500 hover:text-blue-300 transition ease-in-out delay-80'>Login</Link></h3>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Apply