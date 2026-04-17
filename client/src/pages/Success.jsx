// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Success = () => {
//   const location = useLocation();

//   console.log("location");
//   return (
//     <div className="m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
//       <p className="text-green-800 font-bold text-lg text-center">
//         {Boolean(location?.state?.text) ? location?.state?.text : "Payment"}{" "}
//         Successfully
//       </p>
//       <Link
//         to="/"
//         className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
//       >
//         Go To Home
//       </Link>
//     </div>
//   );
// };

// export default Success;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl text-green-600 font-bold">
        🎉 Order Placed Successfully
      </h1>

   

      <button
        onClick={() => navigate("/my-orders")}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Track Order
      </button>
    </div>
  );
};

export default Success;