import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [handle, setHandle] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('Token')){
      router.push('/dashbord')
    }
}, [])

  function handleSubmit(e){
    e.preventDefault();
    
    router.push({
      pathname: '/signup',
      query: { handle },
    });
  }

  return (
    <>
      <main className='max-w-screen-xl mx-auto'>
        <section className='main flex-col mt-40 md:p-10'>
          <div className='max-w-xl'>
            <h1 className='text-7xl font-black'>
              Your one Link <br />For Everything
            </h1>
            <h2 className='text-slate-500 text-xl mt-6'>
              Share your links, Social profile, Contact info and more on one page
            </h2>
          </div>
          <div className='mt-4'>
            <form onSubmit={handleSubmit} className='4xl:inline-flex drop-shadow-md'>
              <span className='py-4 pl-4 rounded-l-lg border-solid border-2 border-slate-100 bg-slate-100'>linksync.to/</span>
              <input value={handle} onChange={(e) => setHandle(e.target.value)} type='text' className='py-4 bg-slate-100' placeholder='Handle Name' />
              <button type='submit' className='p-4 rounded-r-lg text-white bg-blue-700 transition ease-in-out delay-80 hover:bg-blue-800 active:scale-90'>
                Join For Free
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
