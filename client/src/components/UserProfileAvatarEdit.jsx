// import React, { useState } from 'react'
// import { FaRegUserCircle } from 'react-icons/fa'
// import { useDispatch, useSelector } from 'react-redux'
// import Axios from '../utils/Axios'
// import summaryApi from '../common/SummaryApi'
// import { updatedAvatar } from '../store/userslice'
// import { IoClose } from "react-icons/io5";

// const UserProfileAvatarEdit = ({close}) => {
//     const user = useSelector(state => state.user)
//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(false)
//     const handleSubmit = (e)=>{
//         e.preventDefault()
//     }
//     const handleUploadAvatarImage = async (e)=>{
//         const file = e.target.files[0]
//         if(!file) {

//            return
//         }
//         const formData = new FormData()
//         formData.append('avatar', file)

//        try {
//         setLoading(true)
//          const response = await Axios({
//           ...summaryApi.uploadAvatar,
//           data: formData
//         })
//         const {data : responseData } = response
//         dispatch(updatedAvatar(responseData.data.avatar))

//        } catch (error) {
//         AxiosToastError(error)

//        }finally{
//          setLoading(false)
//        }

//     }

//   return (
// <section className='fixed top-0 bottom-0 left-0 right-0  inset-0 bg-neutral-900/60 p-4 flex items-center justify-center '>
// <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justfy-center '
// >
//  <button
//   type="button"
//   onClick={close}
//   className="text-neutral-800 block w-fit ml-auto mb-2 cursor-pointer"
// >
//   <IoClose size={20} />
// </button>
//    <div className=' w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden  drop-shadow-lg '>
//                   {
//                       user.avatar ? (
//                           <img
//                               alt={user.name}
//                               src={user.avatar}
//                               className='w-full h-full '
//                           />

//                       ) : (
//                           <FaRegUserCircle size={65} />

//                       )
//                   }

//               </div>
//               <form onSubmit={handleSubmit

//               } className='flex flex-col items-center justify-center'>
//                 <label htmlFor='uploadProfile'>
//                   <div className=' border border-primary hover:bg-primary px-4 py-1 rounded text-sm my-3 cursor-pointer'>

//                 {
//                   loading ? "loading..." : "Upload"
//                 }
//               </div>
//                     </label>
//                 <input onChange={handleUploadAvatarImage} type="file"
//                 id='uploadProfile' className='hidden' />

//               </form>

// </div>

// </section>  )
// }

// export default UserProfileAvatarEdit

import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { updatedAvatar } from "../store/userslice";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.uploadAvatar,
        data: formData,
      });

      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
      close();
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      fixed inset-0 z-50
      bg-black/60 backdrop-blur-sm
      flex items-center justify-center p-4
    "
    >
      <div
        className="
        bg-white w-full max-w-sm
        rounded-2xl p-6
        shadow-2xl
        relative
        animate-scaleIn
      "
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          className="
            absolute top-3 right-3
            text-gray-500 hover:text-gray-800
            transition
          "
        >
          <IoClose size={22} />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <div
            className="
            w-24 h-24 rounded-full overflow-hidden
            ring-4 ring-primary/20
            shadow-lg
            flex items-center justify-center
            bg-gray-100
          "
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={70} className="text-gray-400" />
            )}
          </div>

          <p className="text-sm text-gray-600 font-medium">
            Update Profile Picture
          </p>
        </div>

        {/* Upload */}
        <form onSubmit={handleSubmit} className="mt-6 flex justify-center">
          <label
            htmlFor="uploadProfile"
            className={`
              px-6 py-2 rounded-full text-sm font-semibold
              border border-primary
              transition-all cursor-pointer
              ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "hover:bg-primary hover:text-white"
              }
            `}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </label>

          <input
            id="uploadProfile"
            type="file"
            accept="image/*"
            onChange={handleUploadAvatarImage}
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
