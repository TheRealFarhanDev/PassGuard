import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-slate-900 py-4 flex justify-around gap-5'>
      <div className="logo">
        <h1 className=' font-bold text-2xl text-white'> <span className='bg-gradient-to-tl from-slate-200 via-green-400 to-zinc-400 bg-clip-text text-transparent'>&lt;</span>Pass<span className='bg-gradient-to-tl from-slate-200 via-green-400 to-zinc-400 bg-clip-text text-transparent'>Guard/&gt;</span></h1>
      </div>
      <div className="github">
        <button className='rounded-full gap-2 text-white px-2 py-1 bg-green-600 font-bold flex justify-center items-center cursor-pointer border border-white'><img width="28" className='mix-blend-color-burn rounded-full' src="./src/assets/github_logo.png" alt="" />Github</button>
      </div>
    </div>
  )
}

export default Navbar
