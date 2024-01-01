import React, { useState } from 'react'
import Footer from "../components/Footer";
import styles from '../styles/apply.module.css'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPasswor] = useState('');

  const router = useRouter();

  function handleLogin(e){
    e.preventDefault()

    fetch(`${process.env.BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        if(res.status !== 200){
          return toast.error("Invalid Credentials");
        }
        return res.json()
      })
    .then((result) => {
        if (result.status === 200) {
          localStorage.setItem('Token', result.Token);
          toast.success("You are logged in");
          router.push('/dashbord');
        }
      })
    .catch((error) => {
        console.log(error)
      });
  }

  return (
    <>
      <section>
      <div  className={styles.background + " main min-h-screen flex flex-col justify-center items-center"}>
          <div className="content bg-white text-black p-6 rounded-lg">
              <h1 className="text-2xl font-black text-center">SIGN IN</h1>
              <p className="text-center mb-3 mx-10">Acces Your Dashboard</p>
              <div className="">
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="email" placeholder='Enter your email' required/>
                      <input value={password} onChange={(e) => setPasswor(e.target.value)} className="border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus" type="password" placeholder='Enter your password' required/>
                      <button className="bg-blue-700 mb-1 mt-4  transition ease-in-out delay-80 hover:scale-105 text-white p-2 rounded-lg" type="submit">Log In</button>
                  </form>
              </div>
          </div>
          <h3 className='text-white mt-3'>New here? <Link href='/signup' className='text-blue-700 hover:text-blue-500 transition ease-in-out delay-80'>Create Account</Link></h3>
        </div>
      </section>
      <Footer/>
    </>
  ) 
}

export default Login