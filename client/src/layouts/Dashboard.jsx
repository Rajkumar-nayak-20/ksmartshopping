// import React from 'react'
// import UserMenu from '../components/usermenu'
// import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const Dashboard = () => {
//   const user=useSelector(state =>state.user)
//   console.log("user in dashboard layout",user);
  
//   return (
//     <section className='bg-white'>
//       <div className="p-3 grid lg:grid-cols-[250px_1fr] gap-4 mx-auto">


//         {/*  left for menu */}
//         <div className="p-2 mt-2 sticky top-24 overflow-y-none flex lg:block
//                  h-screen w-[30%] border-r-gray-200 border-t-0 items-center justify-center">
//           <UserMenu />
//         </div>

//         {/*  right for content */}
//         <div className=' bg-white p-4 min-h-screen w-full'>
//           <Outlet />
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from 'react'
import UserMenu from '../components/usermenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  const [openMenu, setOpenMenu] = useState(false)

  // Lock background scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : 'auto'
  }, [openMenu])

  return (
    <section className="bg-white min-h-screen relative">

   
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setOpenMenu(true)}
          className="p-2 rounded-lg border border-gray-200"
        >
          <Menu size={22} />
        </button>
        <h2 className="font-semibold text-lg">Dashboard</h2>
      </div>

    
      <div className="p-3 lg:grid lg:grid-cols-[250px_1fr] gap-4 mx-auto">

      
        <div
          className="
            hidden lg:block
            p-2 mt-2 sticky top-24
            h-[calc(100vh-6rem)]
            border- border-gray-200  my-3
          "
        >
          <UserMenu />
        </div>

       
        <main className="bg-white p-4 min-h-screen w-full">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 lg:hidden
          transition-opacity duration-300
          ${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setOpenMenu(false)}
      >
        <aside
          className={`
            absolute left-0
            top-[200px]
                         
            h-[calc(100vh-px)]    
            w-[75%] max-w-[280px]
            bg-white shadow-xl
            transform transition-transform duration-300
            ${openMenu ? 'translate-x-0' : '-translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* MENU HEADER */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Menu</h3>
            <button onClick={() => setOpenMenu(false)}>
              <X size={22} />
            </button>
          </div>

          {/* USER MENU */}
          <div className="p-2 overflow-y-auto h-[calc(100%-4rem)]">
            <UserMenu />
          </div>
        </aside>
      </div>

    </section>
  )
}

export default Dashboard


