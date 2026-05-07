

//     //         </div>
//     //     </footer>
//     // )
    
//     return (
//   <footer className="relative bg-gradient-to-b from-[#064e3b] to-[#062a1f] text-gray-300">

//     {/* Top Glossy Green Glow */}
//     <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#34d399] to-transparent" />

//     <div className="container mx-auto px-5 py-12">

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">

//         {/* Brand */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-extrabold text-white tracking-wide">
//           <i className='text-4xl text-emerald-400'> K’</i>
          
//           s Mart 🛒
//           </h2>
//           <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
//             A fast, secure, and scalable online shopping platform with
//             a premium green glossy app experience.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <p className="text-white font-semibold mb-4">Quick Links</p>
//           <ul className="space-y-3 text-sm">
//             <li><Link to="/" className="hover:text-[#34d399] transition">Home</Link></li>
//             <li><Link to="/search" className="hover:text-[#34d399] transition">Shop</Link></li>
//             <li><Link to="/dashboard/myorders" className="hover:text-[#34d399] transition">My Orders</Link></li>
//             <li><Link to="/dashboard/profile" className="hover:text-[#34d399] transition">Profile</Link></li>
//           </ul>
//         </div>

//         {/* Support */}
//         <div>
//           <p className="text-white font-semibold mb-4">Support</p>
//           <ul className="space-y-3 text-sm">
//             <li><Link to="/help" className="hover:text-[#34d399] transition">Help Center</Link></li>
//             <li><Link to="/privacy-policy" className="hover:text-[#34d399] transition">Privacy Policy</Link></li>
//             <li><Link to="/terms" className="hover:text-[#34d399] transition">Terms & Conditions</Link></li>
//             <li><Link to="/refund-policy" className="hover:text-[#34d399] transition">Refund Policy</Link></li>
//           </ul>
//         </div>

//         {/* Social */}
//         <div>
//           <p className="text-white font-semibold mb-4">Connect With Us</p>

//           <div className="flex justify-center sm:justify-start gap-6 text-2xl">
//             <a
//               href="https://www.facebook.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-[#34d399] hover:scale-110 transition"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href="https://www.instagram.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-[#34d399] hover:scale-110 transition"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://www.linkedin.com"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:text-[#34d399] hover:scale-110 transition"
//             >
//               <FaLinkedin />
//             </a>
//           </div>

//           <p className="text-xs text-gray-400 mt-6">
//             <a href="mailto:support@kcart.com" className="hover:text-white">
//               support@k`s_mart.com
//             </a>
//           </p>
//         </div>

//       </div>

//       {/* Divider */}
//       <div className="border-t border-white/10 my-8" />

//       {/* Bottom */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
//         <p>
//           © 2026 <span className="text-white font-semibold">K`s Shopping Mart</span>. All rights reserved.
//         </p>
//         <p>
//           Designed & Developed by{" "}
//           <span className="text-[#34d399] font-semibold">
//             Rajkumar Nayak
//           </span>
//         </p>
//       </div>

//     </div>
//   </footer>
// )
    
    
// }

// export default Footer



import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto overflow-hidden">
      
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-4
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-3
      "
      >
        
        {/* LEFT */}
        <p
          className="
          text-sm
          text-gray-600
          text-center
          sm:text-left
        "
        >
          © All Rights Reserved 2026.
        </p>

        {/* RIGHT */}
        <div
          className="
          flex
          items-center
          justify-center
          gap-4
          text-xl
        "
        >
          <a
            href="#"
            className="
            text-gray-500
            hover:text-primary-600
            transition
            duration-200
          "
          >
            <FaFacebook />
          </a>

          <a
            href="#"
            className="
            text-gray-500
            hover:text-pink-500
            transition
            duration-200
          "
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="
            text-gray-500
            hover:text-blue-600
            transition
            duration-200
          "
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;