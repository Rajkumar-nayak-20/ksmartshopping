import React from 'react'
import UserMenu from '../components/usermenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
      <div className="p-3 grid lg:grid-cols-[250px_1fr] gap-4 mx-auto">


        {/*  left for menu */}
        <div className="p-2 mt-2 sticky top-24 overflow-y-none flex lg:block
                 h-screen w-[30%] border-r-gray-200 border-t-0 items-center justify-center">
          <UserMenu />
        </div>

        {/*  right for content */}
        <div className=' bg-white p-4 min-h-screen w-full'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Dashboard


