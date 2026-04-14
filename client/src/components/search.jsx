import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const [search, setSearch] = useState("");
  const params = useLocation();
  const searchText = params.search.slice(3);

  // detect search page
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);

    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearch(query);
  }, [location]);

  const redirectTosearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div
      className="
      w-full min-w-[18rem] lg:min-w-[26rem]
      h-12 lg:h-14
      rounded-2xl
      overflow-hidden
      flex items-center
      bg-white/80 backdrop-blur-md
      border border-[#ffbf00]
      shadow-sm
      transition-all duration-300
      focus-within:ring-2 focus-within:ring-[#ffbf00]/40
      group
    "
    >
      {/* Left Icon */}
      <div className="flex items-center pl-2">
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="
              flex items-center justify-center
              w-9 h-9
              rounded-full
              bg-white
              text-[#ffbf00]
              shadow-md
              hover:scale-105
              transition
            "
          >
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <button
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              text-[#ffbf00]
              hover:bg-[#ffbf00]/10
              transition
            "
          >
            <IoIosSearch size={22} />
          </button>
        )}
      </div>

      {/* Input / Animation */}
      <div className="w-full px-3 text-sm">
        {!isSearchPage ? (
          <div
            onClick={redirectTosearchPage}
            className="
              cursor-text
              text-gray-500
              font-medium
              tracking-wide
              select-none
            "
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "rice"',
                1000,
                'Search "curd"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
                'Search "chocolate"',
                1000,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="text"
            value={search}
            autoFocus
            placeholder="Search for products…"
            defaultValue={searchText}
            className="
              w-full bg-transparent
              outline-none
              text-gray-700
              placeholder-gray-400
              text-sm
            "
            onChange={handleOnChange}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
