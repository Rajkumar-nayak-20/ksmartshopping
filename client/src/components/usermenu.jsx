// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Divider from "./Divider";
// import Axios from "../utils/Axios";
// import summaryApi from "../common/SummaryApi";
// import { logout } from "../store/userslice";
// import toast from "react-hot-toast";
// import AxiosToastError from "../utils/AxiosToastError";
// import {
//   HiOutlineLogout,
//   HiOutlineUser,
//   HiOutlineCube,
//   HiOutlineShoppingBag,
//   HiOutlineLocationMarker,
//   HiOutlineCog,
//   HiOutlineChevronRight
// } from "react-icons/hi";
// import { BiCategory, BiSubdirectoryRight } from "react-icons/bi";

// const UserMenu = ({ close }) => {
//     const user = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             const response = await Axios({ ...summaryApi.logout });
//             if (response.data.success) {
//                 if(close) close();
//                 dispatch(logout());
//                 localStorage.clear();
//                 toast.success(response.data.message);
//                 navigate("/");
//             }
//         } catch (error) {
//             AxiosToastError(error);
//         }
//     }

//     const handleClose = () => {
//         if(close) close();
//     }

//     const menuItems = [
//         { name: "Category", path: "/dashboard/Category", icon: <BiCategory className="w-4 h-4" /> },
//         { name: "Sub Category", path: "/dashboard/Subcategory", icon: <BiSubdirectoryRight className="w-4 h-4" /> },
//         { name: "Upload Product", path: "/dashboard/upload-product", icon: <HiOutlineCube className="w-4 h-4" /> },
//         { name: "Product", path: "/dashboard/Product", icon: <HiOutlineCube className="w-4 h-4" /> },
//         { name: "My Orders", path: "/dashboard/myorders", icon: <HiOutlineShoppingBag className="w-4 h-4" /> },
//         { name: "Save Address", path: "/dashboard/address", icon: <HiOutlineLocationMarker className="w-4 h-4" /> }
//     ];

//     return (
//         <div className="bg-white rounded-none shadow-lg border border-gray-200 w-64 h-auto overflow-hidden items-center justify-center mx-3 ">
//             {/* Header - Compact */}
//             <div className="p-4 border-b border-gray-100 bg-amber-50">
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white font-semibold">
//                         {user.name?.charAt(0).toUpperCase() || "U"}
//                     </div>
//                     <div className="flex-1">
//                         <p className="font-semibold text-gray-900">{user.name || "User"}</p>
//                         <p className="text-xs text-gray-600 truncate">{user.email || user.mobile}</p>
//                     </div>
//                     <Link
//                         onClick={handleClose}
//                         to={"/dashboard/profile"}
//                         className="p-1.5 rounded-md hover:bg-white text-gray-500 hover:text-amber-600"
//                         title="Profile Settings"
//                     >
//                         <HiOutlineCog className="w-4 h-4" />
//                     </Link>
//                 </div>
//             </div>

//             {/* Navigation Menu - Compact */}
//             <div className="p-3">
//                 <div className="mb-3">
//                     <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
//                         Menu
//                     </h3>

//                     <div className="space-y-1">
//                         {menuItems.map((item, index) => (
//                             <Link
//                                 key={index}
//                                 onClick={handleClose}
//                                 to={item.path}
//                                 className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-gray-700 transition-colors group"
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <div className="text-gray-500 group-hover:text-amber-500">
//                                         {item.icon}
//                                     </div>
//                                     <span className="text-sm font-medium">{item.name}</span>
//                                 </div>
//                                 <HiOutlineChevronRight className="w-3 h-3 text-gray-300 group-hover:text-amber-400" />
//                             </Link>
//                         ))}
//                     </div>
//                 </div>

//                 <Divider className="my-3" />

//                 {/* Logout Button - Compact */}
//                 <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
//                 >
//                     <HiOutlineLogout className="w-4 h-4" />
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserMenu;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userslice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";
import {
  LayoutGrid,
  Layers,
  Upload,
  Package,
  ShoppingBag,
  MapPin,
  LogOut,
  User,
} from "lucide-react";

const usermenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  //   return (
  //     <div>
  //         <div className='font-semibold'>My Account</div>
  //         <div className='text-sm flex items-center gap-2'>
  //           <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
  //           <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
  //             <HiOutlineExternalLink size={15}/>
  //           </Link>
  //         </div>

  //         <Divider/>

  //         <div className='text-sm grid gap-1'>
  //             {
  //               isAdmin(user.role) && (
  //                 <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Category</Link>
  //               )
  //             }

  //             {
  //               isAdmin(user.role) && (
  //                 <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Sub Category</Link>
  //               )
  //             }

  //             {
  //               isAdmin(user.role) && (
  //                 <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1'>Upload Product</Link>
  //               )
  //             }

  //             {
  //               isAdmin(user.role) && (
  //                 <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1'>Product</Link>
  //               )
  //             }

  //             <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1'>My Orders</Link>

  //             <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Save Address</Link>

  //             <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-1'>Log Out</button>

  //         </div>
  //     </div>
  //   )
  return (
    <div className="space-y-4">
      {/* ================= PROFILE CARD ================= */}
      <div
        className="
        relative overflow-hidden
        rounded-2xl p-4
        bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400
        text-white shadow-lg
      "
      >
        <div className="absolute inset-0 bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <div className="text-sm opacity-90">My Account</div>

          <div className="mt-1 flex items-center gap-2">
            <User size={18} className="opacity-90" />

            <span className="max-w-40 truncate font-semibold text-base">
              {user.name || user.mobile}
            </span>

            {user.role === "ADMIN" && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/30 font-bold tracking-wide">
                ADMIN
              </span>
            )}

            <Link
              onClick={handleClose}
              to={"/dashboard/profile"}
              className="
              ml-auto
              p-1.5 rounded-full
              bg-white/20 hover:bg-white/30
              transition
            "
            >
              <HiOutlineExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}
      <div className="space-y-1 text-sm">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="
            group flex items-center gap-3
            px-4 py-2.5 rounded-xl
            hover:bg-orange-100 transition-all
          "
          >
            <LayoutGrid
              size={18}
              className="text-orange-500 group-hover:scale-110 transition"
            />
            <span>Category</span>
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="
            group flex items-center gap-3
            px-4 py-2.5 rounded-xl
            hover:bg-orange-100 transition
          "
          >
            <Layers
              size={18}
              className="text-orange-500 group-hover:scale-110 transition"
            />
            <span>Sub Category</span>
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="
            group flex items-center gap-3
            px-4 py-2.5 rounded-xl
            hover:bg-orange-100 transition
          "
          >
            <Upload
              size={18}
              className="text-orange-500 group-hover:scale-110 transition"
            />
            <span>Upload Product</span>
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="
            group flex items-center gap-3
            px-4 py-2.5 rounded-xl
            hover:bg-orange-100 transition
          "
          >
            <Package
              size={18}
              className="text-orange-500 group-hover:scale-110 transition"
            />
            <span>Product</span>
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="
          group flex items-center gap-3
          px-4 py-2.5 rounded-xl
          hover:bg-orange-100 transition
        "
        >
          <ShoppingBag
            size={18}
            className="text-gray-500 group-hover:scale-110 transition"
          />
          <span>My Orders</span>
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="
          group flex items-center gap-3
          px-4 py-2.5 rounded-xl
          hover:bg-orange-100 transition
        "
        >
          <MapPin
            size={18}
            className="text-gray-500 group-hover:scale-110 transition"
          />
          <span>Save Address</span>
        </Link>

        {/* ================= LOGOUT ================= */}
        <button
          onClick={handleLogout}
          className="
          mt-3 w-full flex items-center gap-3
          px-4 py-2.5 rounded-xl
          bg-gradient-to-r from-red-50 to-red-100
          text-red-600 font-semibold
          hover:from-red-100 hover:to-red-200
          transition
        "
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default usermenu;
