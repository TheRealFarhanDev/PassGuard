import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useRef, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const ref = useRef();

  const [eyeState, setEyeState] = useState("hover-lashes")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setform] = useState({ url: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])




  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
    setEyeState(passwordVisible ? "hover-lashes" : "in-reveal")
  }

  const resetForm = () => {
    setform({ url: "", username: "", password: "" })
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => { toast.success(`${text} Copied!`) })
      .catch((err) => { toast.error(`Copy Failed - ${err}`) })
  }

  const handleDelete = (a) => {
    const newArr = passwordArray.filter((item) => item.id !== a)
    setPasswordArray(newArr)
    localStorage.setItem('passwords', JSON.stringify(newArr));
    toast.success('Successfully Deleted!')
  }

  const handleEdit = (id) => {
    const newArr = passwordArray.find((item) => item.id === id)
    if (newArr) {
      setform(newArr)
      setPasswordArray(passwordArray.filter((item)=> item.id !== id))
  }
  }

  

  const handleSave = (e) => {
    e.preventDefault();
    const newID = uuidv4();
    const newItem = { ...form, id: newID }
    setPasswordArray([...passwordArray, newItem])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, newItem]))
    resetForm();
    toast.success('Successfully Saved!')
  }

  return (
    <>
      <div className='bg-gradient-to-b from-[#bbf7d0] via-[#5cde8c] to-[#16a34a] min-h-screen m-w-screen m-0 font-poppins'>
        <Navbar />
        <div className="container px-10 lg:px-30 py-5 mx-auto">
          <div className="text-center pt-2 leading-5">
            <h1 className=' font-bold text-3xl text-black'> <span className='bg-gradient-to-tl from-green-600 via-green-400 to-slate-900 bg-clip-text text-transparent'>&lt;</span>Pass<span className='text-green-600'>Guard/&gt;</span> </h1>
            <p>Your own Password Manager</p>
          </div>
          <form onSubmit={handleSave}>
            <div className='my-5 flex justify-center items-center '>
              <input type="text" className='w-full rounded-full outline-none bg-white px-4 py-2 border border-green-900' placeholder='Enter website URL' onChange={handleChange} name='url' value={form.url} autoFocus required />
            </div>
            <div className='my-1 flex md:flex-row flex-col justify-center items-center w-full mx-auto shrink relative gap-5'>
              <input type="text" className='w-full md:w-1/2 lg:w-3/4  rounded-full outline-none bg-white px-4 py-2 border border-green-900' placeholder='Enter Username' onChange={handleChange} name='username' value={form.username} required />
              <input type={passwordVisible ? 'text' : 'password'} name="password" className='w-full md:w-1/2 lg:w-1/4 rounded-full outline-none bg-white px-4 py-2 border border-green-900' placeholder='Enter Password' onChange={handleChange} value={form.password} required />
              <button type='button' className="absolute md:top-1 bottom-0 right-3 cursor-pointer" onClick={showPassword}><lord-icon src="https://cdn.lordicon.com/dicvhxpz.json" trigger="hover" stroke="light" state={eyeState} colors="primary:#121331,secondary:#16a34a">
              </lord-icon></button>
            </div>
            <div className='flex justify-center items-center mb-10'>
              <button type='submit' className='mt-5 text-center text-white font-bold bg-green-500 px-3.5 text-lg justify-center py-1 rounded-full flex items-center gap-1.5 ring-green-700 ring-1 cursor-pointer'>
                <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" delay="500" state="hover-add-card" colors="primary:#000"></lord-icon>
                Save
              </button>
              <Toaster
                position="top-right"
                reverseOrder={false}
              />
            </div>
          </form>

          <h2 className='text-2xl font-bold mb-5 '>Passwords</h2>
          {passwordArray.length > 0 ? (<div className="relative overflow-x-auto rounded-xl mb-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => {
                  return (<tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a href={item.url.includes('http://') || item.url.includes('https://') ? item.url : `https://${item.url}`} className='!text-gray-400/90 hover:!text-gray-300' target='_blank'>{item.url}</a>
                    </th>
                    <td className="px-6 py-4">
                      <div className='flex gap-2 items-center'>
                        {item.username} <button onClick={() => (handleCopy(item.username))} className='cursor-pointer relative top-0.5'>
                          <lord-icon
                            src="https://cdn.lordicon.com/lomfljuq.json"
                            trigger="hover"
                            colors="primary:#16a34a"
                            style={{ 'width': '25px', 'height': '25px' }}>
                          </lord-icon>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className='flex gap-2 items-center'>
                        {item.password} <button onClick={() => (handleCopy(item.password))} className='cursor-pointer relative top-0.5'>
                          <lord-icon
                            src="https://cdn.lordicon.com/lomfljuq.json"
                            trigger="hover"
                            colors="primary:#16a34a"
                            style={{ 'width': '25px', 'height': '25px' }}>
                          </lord-icon>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className='flex gap-2'>
                        <button className='cursor-pointer' onClick={() => { handleEdit(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#fff,secondary:#5cde8c"
                            style={{ 'width': '25px', 'height': '25px' }}>
                          </lord-icon>
                        </button>

                        <button className='deletebtn cursor-pointer' onClick={() => { handleDelete(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#fff,secondary:#5cde8c"
                            style={{ 'width': '25px', 'height': '25px' }}>
                          </lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>


          </div>) : (<h2 className='text-xl font-bold'>No Saved Passwords</h2>)}

        </div>



      </div>
      <div className='fixed bottom-0 w-full mt-auto'>
        <Footer />
      </div>
    </>
  )
}

export default App
