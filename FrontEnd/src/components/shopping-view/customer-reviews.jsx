import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely love my purchase! The quality exceeded my expectations and delivery was super fast. Will definitely shop here again!',
      date: 'March 15, 2024',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      comment: 'Great product at a reasonable price. Customer service was excellent when I had a question about sizing.',
      date: 'February 28, 2024',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      rating: 5,
      comment: 'This is my third order and I continue to be impressed. The items are always packaged with care and arrive in perfect condition.',
      date: 'March 5, 2024',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 4,
      name: 'David Wilson',
      rating: 5,
      comment: 'Exceptional quality and attention to detail. The product looks even better in person than on the website!',
      date: 'January 20, 2024',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Trusted by thousands of happy customers worldwide
        </p>

        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-purple-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mb-6 flex-grow">
                    <FaQuoteLeft className="text-purple-100 text-4xl absolute -top-2 -left-2" />
                    <p className="text-gray-600 relative z-10 pl-8">{review.comment}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-auto">{review.date}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* <div className="text-center mt-8">
          <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
            View All Reviews
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default CustomerReviews;