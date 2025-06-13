// components/Carousel.tsx
"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Course } from "@prisma/client";

interface CarouselProps {
  courses: Course[];
}

export const Carousel = ({ courses }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-6">
      <Slider {...settings}>
        {courses.map((course) => (
          <div key={course.id} className="px-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};