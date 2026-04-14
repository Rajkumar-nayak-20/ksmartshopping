import React from "react";
import { useNavigate } from "react-router-dom";

const CartBottomBar = ({ totalQty, totalPrice }) => {
  const navigate = useNavigate();

  if (!totalQty) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pb-3">
      <div className="max-w-7xl mx-auto bg-green-600 text-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col text-sm">
          <span>{totalQty} items</span>
          <span className="font-semibold">₹{totalPrice}</span>
        </div>

        <button
          onClick={() => navigate("/cart")}
          className="font-semibold flex items-center gap-1"
        >
          View Cart →
        </button>
      </div>
    </div>
  );
};

export default CartBottomBar;
