"use client";
import { useEffect, useState } from "react";

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = [
    {
      icon: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>,
      title: "100% Practical Courses",
      description: "100% Practical Courses is a dynamic learning initiative focused on hands-on, real-world training that equips learners with actionable skills. Designed for immediate application, these courses emphasize practical exercises, simulations, and projects over theoretical content, ensuring participants gain confidence and competence in their chosen fields."
    },
    {
      icon: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-5 4h4m-4 4h4m-4-8h4" />
      </svg>,
      title: "Worldclass Skills Training",
      description: "We deliver high-quality, industry-relevant skills development programs. We offer comprehensive training solutions tailored to professionals and organizations, emphasizing practical expertise, innovative teaching methods, and accessible learning resources to empower individuals and teams for success in a competitive global market."
    },
    {
      icon: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>,
      title: "All Time Support Online Sessions",
      description: "Online Sessions offers round-the-clock access to live, expert-led training and assistance, ensuring learners receive continuous guidance and support. Available anytime, these sessions provide interactive problem-solving, personalized feedback, and real-time collaboration, making skill development seamless and accessible worldwide."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-600 text-center mb-6">
        From rookie to expert - Onboard your new joiners to success in no time.
      </h2>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index}
              className="min-w-full bg-white p-4 rounded-lg shadow flex flex-col items-center text-center"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-lg font-medium text-yellow-600">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <a href="#" className="mt-2 text-sm text-purple-600">→</a>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}