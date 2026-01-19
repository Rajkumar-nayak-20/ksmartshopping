import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { logout } from "../store/userslice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { 
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCube,
  HiOutlineShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineCog,
  HiOutlineChevronRight
} from "react-icons/hi";
import { BiCategory, BiSubdirectoryRight } from "react-icons/bi";

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await Axios({ ...summaryApi.logout });
            if (response.data.success) {
                if(close) close();
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const handleClose = () => {
        if(close) close();  
    }

    const menuItems = [
        { name: "Category", path: "/dashboard/Category", icon: <BiCategory className="w-4 h-4" /> },
        { name: "Sub Category", path: "/dashboard/Subcategory", icon: <BiSubdirectoryRight className="w-4 h-4" /> },
        { name: "Upload Product", path: "/dashboard/upload-product", icon: <HiOutlineCube className="w-4 h-4" /> },
        { name: "Product", path: "/dashboard/Product", icon: <HiOutlineCube className="w-4 h-4" /> },
        { name: "My Orders", path: "/dashboard/myorders", icon: <HiOutlineShoppingBag className="w-4 h-4" /> },
        { name: "Save Address", path: "/dashboard/address", icon: <HiOutlineLocationMarker className="w-4 h-4" /> }
    ];

    return (
        <div className="bg-white rounded-none shadow-lg border border-gray-200 w-64 h-auto overflow-hidden">
            {/* Header - Compact */}
            <div className="p-4 border-b border-gray-100 bg-amber-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900">{user.name || "User"}</p>
                        <p className="text-xs text-gray-600 truncate">{user.email || user.mobile}</p>
                    </div>
                    <Link 
                        onClick={handleClose} 
                        to={"/dashboard/profile"}
                        className="p-1.5 rounded-md hover:bg-white text-gray-500 hover:text-amber-600"
                        title="Profile Settings"
                    >
                        <HiOutlineCog className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Navigation Menu - Compact */}
            <div className="p-3">
                <div className="mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                        Menu
                    </h3>
                    
                    <div className="space-y-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                onClick={handleClose}
                                to={item.path}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-gray-700 transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-gray-500 group-hover:text-amber-500">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                                <HiOutlineChevronRight className="w-3 h-3 text-gray-300 group-hover:text-amber-400" />
                            </Link>
                        ))}
                    </div>
                </div>

                <Divider className="my-3" />

                {/* Logout Button - Compact */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                >
                    <HiOutlineLogout className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default UserMenu;