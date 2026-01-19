// import React, { useEffect } from 'react'
// import './App.css'
// import { Outlet } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import toast, { Toaster } from 'react-hot-toast';
// import fetchUserDetails from './utils/fetchUserDetails'

// function App () {
//   const fetchUser =async ()=>{
//     const userData = await fetchUserDetails()
//   console.log("user data ", userData);
//   }

//   useEffect(() => {
//     fetchUser()
//   },[]
// )

//   return (
//   <>
//    <Header/>
//     <main className='min-h-[78vh]'>
//       <Outlet/>
     
//     </main>
//     <Footer/>
//     <Toaster/>
//   </>
//   )
// }

// export default App

import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserDetails'

import { setUserDetails } from './store/userslice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
   
    dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
