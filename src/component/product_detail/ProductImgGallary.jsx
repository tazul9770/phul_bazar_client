import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import defaultImage from "../../assets/image/default_product.jpg";

const ProductImageGallery = ({ images = [], ProductName = "Product" }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const displayImages = images.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="rounded-lg border border-gray-200 overflow-hidden mb-3"
      >
        {displayImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square">
              <img
                src={img.image}
                alt={ProductName}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className="cursor-pointer mt-2"
        >
          {displayImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square border border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-all">
                <img
                  src={img.image}
                  alt={`${ProductName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImageGallery;
