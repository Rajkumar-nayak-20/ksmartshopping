import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';


const search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile]=useMobile()
    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)

    }, [location])


    const redirectTosearchPage = () => {
        navigate('/search')


    }
    console.log("serach", isSearchPage);

    // return (
    //     <div className='w-full  min-w-75 lg:min-w-105 h-11 lg:h-12 rounded-lg border-amber-50 overflow-hidden flex items-center  text-neutral-500 bg-slate-50    bg-blend-color-dodge border group  border-[#ffbf00]! '>
    //         <div>


    //             {
    //                 (isMobile && isSearchPage) ? (
    //                     <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1group-focus-within:text-primary-200 cursor-pointer text-[#ffbf00]! bg-white rounded-full shadow=md'>
    //                         <FaArrowLeft size={20} />

    //                     </Link>

    //                 ) : (
    //                     <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 cursor-pointer text-[#ffbf00]!'>
    //                         <IoIosSearch size={22} />
    //                     </button>
    //                 )
    //             }

    //         </div>

    //         <div className='w-full pr-2 '>
    //             {
    //                 !isSearchPage ? (
    //                     //note in search page
    //                     <div onClick={redirectTosearchPage}>
    //                         <TypeAnimation
    //                             sequence={[
    //                                 // Same substring at the start will only be typed out once, initially
    //                                 'Search "milk"',
    //                                 1000, // wait 1s before replacing "Mice" with "Hamsters"
    //                                 'Search "bread"',
    //                                 1000,
    //                                 'Search "sugar"',
    //                                 1000,
    //                                 'Search panner ',
    //                                 1000,
    //                                 'Search "rice"',
    //                                 1000,
    //                                 'Search "curd"',
    //                                 1000,
    //                                 'Search "egg"',
    //                                 1000,
    //                                 'Search "chips"',
    //                                 1000,
    //                                 'Search "chocolate"',
    //                                 1000,
    //                                 'Search "curd"',




    //                             ]}
    //                             wrapper="span"
    //                             speed={50}

    //                             repeat={Infinity}
    //                         />
    //                     </div>

    //                 ) : (
    //                     //when i was serch page
    //                     <div className='w-full  '>
    //                         <input type="text" className='w-full outline-none bg-slate-50 ' placeholder='Search for products..'
    //                             autoFocus />
    //                     </div>
    //                 )
    //             }

    //         </div>

    //     </div>
    // )
    return (
  <div className="
    w-full min-w-[18rem] lg:min-w-[26rem]
    h-12 lg:h-14
    rounded-2xl
    overflow-hidden
    flex items-center
    bg-white/80 backdrop-blur-md
    border border-[#ffbf00]
    shadow-sm
    transition-all duration-300
    focus-within:ring-2 focus-within:ring-[#ffbf00]/40
    group
  ">
    
    {/* Left Icon */}
    <div className="flex items-center pl-2">

      {(isMobile && isSearchPage) ? (
        <Link
          to="/"
          className="
            flex items-center justify-center
            w-9 h-9
            rounded-full
            bg-white
            text-[#ffbf00]
            shadow-md
            hover:scale-105
            transition
          "
        >
          <FaArrowLeft size={18} />
        </Link>
      ) : (
        <button
          className="
            flex items-center justify-center
            w-10 h-10
            rounded-full
            text-[#ffbf00]
            hover:bg-[#ffbf00]/10
            transition
          "
        >
          <IoIosSearch size={22} />
        </button>
      )}

    </div>

    {/* Input / Animation */}
    <div className="w-full px-3 text-sm">

      {!isSearchPage ? (
        <div
          onClick={redirectTosearchPage}
          className="
            cursor-text
            text-gray-500
            font-medium
            tracking-wide
            select-none
          "
        >
          <TypeAnimation
            sequence={[
              'Search "milk"', 1000,
              'Search "bread"', 1000,
              'Search "sugar"', 1000,
              'Search "paneer"', 1000,
              'Search "rice"', 1000,
              'Search "curd"', 1000,
              'Search "egg"', 1000,
              'Search "chips"', 1000,
              'Search "chocolate"', 1000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
          />
        </div>
      ) : (
        <input
          type="text"
          autoFocus
          placeholder="Search for products…"
          className="
            w-full bg-transparent
            outline-none
            text-gray-700
            placeholder-gray-400
            text-sm
          "
        />
      )}

    </div>

  </div>
)

}

export default search