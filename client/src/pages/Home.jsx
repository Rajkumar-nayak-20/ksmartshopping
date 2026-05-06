import React from "react";
import bannerMobile from "../assets/banner-mobile.jpg"
import b1 from "../assets/6976007.jpg"
import b2 from "../assets/8633609.jpg"
import { useSelector } from "react-redux"
import { valideURLConvert } from "../utils/valideURLConvert"
import { useNavigate } from "react-router-dom"
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

//patch ka mtlb ki hum data ko partially update karna chahte hai server pe, agar hum put request bhejte hai to pura data update hoga chahe humne kuch fields hi bheje ho, lekin agar hum patch request bhejte hai to sirf wo fields update honge jo humne bheje hai
const Home = () => {
  const loadingCategory = useSelector(
    (state) => state.product?.loadingCategory,
  );//use selector ka use isliye karte hai taki hum redux store se data fetch kar sake aur usko component me use kar sake
  const categoryData = useSelector((state) => state.product?.allCategory || []);//agar state.product.allCategory undefined hua to empty array return karega taki code me error na aaye
  const subcategoryData = useSelector(
    (state) => state.product?.allSubCategory || [],
  );

  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subcategoryData.find((sub) => {
      if (Array.isArray(sub.category)) {
        return sub.category.some((c) => c._id === id);
      }
      return sub.category?._id === id;
    });

    if (!subcategory) return;

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name,
    )}-${subcategory._id}`;

    navigate(url);
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* 🔥 BANNER */}
      <div className="container mx-auto px-3 sm:px-4">
        <div className="rounded-xl overflow-hidden my-4 shadow-md">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <picture>
                <source media="(min-width:1024px)" srcSet={b1} />
                <img
                  src={b1}
                  alt="banner"
                  className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] object-cover"
                />
              </picture>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <picture>
                <source media="(min-width:1024px)" srcSet={b2} />
                <img
                  src={b2}
                  alt="banner"
                  className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] object-cover"
                />
              </picture>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <picture>
                <source media="(min-width:1024px)" srcSet={b1} />
                <img
                  src={bannerMobile}
                  alt="banner"
                  className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] object-cover"
                />
              </picture>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* 🔥 CATEGORY GRID */}
      <div className="container mx-auto px-4 my-8">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4">
          {categoryData.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              className="group relative flex flex-col items-center justify-center 
                         bg-gradient-to-br from-white to-gray-50 
                         rounded-2xl p-3 
                         shadow-sm hover:shadow-xl 
                         transition-all duration-300 
                         cursor-pointer 
                         overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              bg-gradient-to-br from-green-100 to-emerald-50 
                              transition duration-300 rounded-2xl"
              ></div>

              {/* Image */}
              <div className="relative z-10 flex items-center justify-center h-20">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-16 object-contain group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Name */}
              <h3 className="relative z-10 mt-2 text-xs font-semibold text-gray-700 text-center">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 CATEGORY PRODUCTS */}
      {categoryData.map((c) => (
        <CategoryWiseProductDisplay
          key={c?._id + "categoryWiseProduct"}
          id={c._id}
          name={c.name}
        />
      ))}
    </section>
  );
};

export default Home;
