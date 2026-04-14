import React, { use, useEffect, useState } from "react";
import d from "../assets/k26.png";
import Search from "./search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./usermenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import Displaycartitem from "./Displaycartitem";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isMobile] = useMobile(); // device mobile hai ya nahi
  const location = useLocation(); // current route
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate(); // navigation
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state?.cartItem.cart);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQty,setTotalQty] = useState(0)
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartsection, setOpenCartSection] = useState(false);

  // redirect to login page
  const redirectTOLoginPage = () => {
    navigate("/login");
  };
  const handlecloseUserMenu = () => {
    setOpenUserMenu(false);
  };
  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  // toast; items and total price

  // useEffect(() => {
  //   const qty = cartItem.reduce((preve,curr)=>{
  //     return preve + curr.quantity

  //   },0)
  //   setTotalQty(qty)
  //  const  tprice = cartItem.reduce((preve,curr)=>{
  //   return preve + (curr.productId.price * curr.quantity)
  //  },0)
  //  setTotalPrice(tprice)

  // console.log("total price",tprice);

  // },[cartItem])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-lg">
      {!(isSearchPage && isMobile) && (
        <div className="flex items-center justify-between h-20 px-6 lg:px-8">
          {/* Logo - Left Corner */}
          <Link to="/" className="flex items-center group shrink-0">
            <div className="relative overflow-hidden rounded-lg p-1">
              <img
                src={d}
                width={220}
                height={50}
                alt="martk"
                className="object-contain transition-all duration-500 scale-330 px-8
                
                 
                 "
              />
              {/* Shine effect */}
              <div
                className="absolute top-0 -inset-x-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent 
                    opacity-0 group-hover:opacity-50 group-hover:animate-shine"
              />
            </div>
          </Link>

          {/* Search - Center (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
            <Search />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Mobile User Icon */}
            <button
              onClick={handleMobileUser}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              <GiHamburgerMenu size={26} />
            </button>

            {/* Desktop User Area */}
            <div className="hidden lg:flex items-center gap-4">
              {/* User/Login Section */}
              {user?._id ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/60 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-gray-800">
                      {user?.name?.split(" ")[0] || "Account"}
                    </span>
                    {openUserMenu ? (
                      <GoTriangleUp
                        className="text-gray-500 group-hover:text-gray-700"
                        size={16}
                      />
                    ) : (
                      <GoTriangleDown
                        className="text-gray-500 group-hover:text-gray-700"
                        size={16}
                      />
                    )}
                  </button>

                  {/* User Menu Dropdown */}
                  {openUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={handlecloseUserMenu}
                      />
                      <div className="absolute right-0 top-full mt-2 z-50 animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 min-w-[280px] overflow-hidden">
                          <div className="p-1">
                            <UserMenu close={handlecloseUserMenu} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectTOLoginPage}
                  className="px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Login
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="relative group "
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  <BsCart4
                    size={20}
                    className="text-white/90 group-hover:scale-110 transition-transform animate-bounce"
                  />
                  {cartItem[0] ? (
                    <div>
                      <p className="font-semibold text-white">
                        {totalQty} items
                      </p>
                      <p className="text-white">
                        {DisplayPriceInRupees(totalPrice)}
                      </p>
                    </div>
                  ) : (
                    <span className="font-semibold text-white">My Cart</span>
                  )}

                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      {!(isSearchPage && isMobile) && (
        <div className="lg:hidden border-t border-gray-100 bg-white/50 px-6 py-3">
          <Search />
        </div>
      )}
      {openCartsection && (
        <Displaycartitem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
