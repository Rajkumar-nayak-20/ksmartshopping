import React from "react";
import { IoClose } from "react-icons/io5";

const Viewimage = ({ url, close }) => {
  return (
    <section
      className="
        fixed inset-0 z-50
        bg-black/70
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          relative
          w-full max-w-lg
          max-h-[85vh]
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          animate-scaleIn
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="
            absolute top-3 right-3
            p-2 rounded-full
            bg-black/70 text-white
            hover:bg-black
            transition
          "
        >
          <IoClose size={20} />
        </button>

        {/* IMAGE */}
        <div className="p-4 flex items-center justify-center">
          <img
            src={url}
            alt="Preview"
            className="max-h-[70vh] w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Viewimage;
