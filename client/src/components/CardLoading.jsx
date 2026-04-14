import React from "react";

const CardLoading = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-3 w-56">
      <div className="min-h-14 lg:min-h-20 bg-blue-50"></div>
      <div className="p-2 lg:p-3 bg-blue-50  rounded w-20"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-14"></div>
      <div className="flex items-center justify-between gap-3">
        <div className="p-2 lg:p-3 bg-blue-50  rounded w-20"></div>

        <div className="p-2 lg:p-3 bg-blue-50  rounded w-20"></div>
      </div>
    </div>
  );
};

export default CardLoading;
