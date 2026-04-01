import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Home, Printer } from "lucide-react";

const Success = () => {
  const location = useLocation();

  // ✅ Safe Data Access
  const paymentText = location?.state?.text || "Payment";

  const paymentId = location?.state?.paymentId;
  const orderId = location?.state?.orderId;

  // ✅ Transaction ID Logic (No Error)
  const transactionId =
    paymentId ||
    orderId ||
    "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  // ✅ Debug (optional)
  console.log("Success Page Data:", location.state);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* ✅ SUCCESS ICON BOX */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center relative">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-green-400 opacity-20 blur-2xl"></div>

          <div className="relative flex flex-col items-center">
            
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-white text-2xl font-bold mt-4">
              {paymentText} Successful
            </h1>

            <p className="text-green-100 text-sm mt-1">
              Your transaction has been completed
            </p>
          </div>
        </div>

        {/* ✅ CONTENT */}
        <div className="p-6 text-center">

          {/* Transaction ID */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
            <p className="text-sm text-gray-500">Order / Transaction ID</p>
            <p className="font-bold text-green-700 text-lg break-all">
              {transactionId}
            </p>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-5">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              <Home size={18} />
              Go To Home
            </Link>

          

          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center text-xs text-gray-500 py-3 border-t">
          Thank you for shopping with us ❤️
        </div>

      </div>

      {/* ✅ PRINT STYLE */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default Success;