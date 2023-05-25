import { useEffect, useState } from "react";
import Image from "next/image";
import data from "@/utils/data/testimonials";

const Testimonials = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleTestimonials, setVisibleTestimonials] = useState<any[]>([]);

  useEffect(() => {
    setVisibleTestimonials(() => data.slice(0, 2));
  }, []);

  const handleShowMoreClick = () => {
    setVisibleTestimonials(data);
    setIsExpanded(true);
  };

  const handleHideClick = () => {
    setVisibleTestimonials(() => data.slice(0, 2));
    setIsExpanded(false);
  };

  return (
    <div className="bg-gray-400 py-8 w-full mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-background sm:text-3xl">
          What people are saying
        </h2>
        <div className="mt-8 grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-y-10 gap-x-6 xl:gap-x-8">
          {visibleTestimonials.map((testimonial: any, index: number) => (
            <div className="bg-white p-6 rounded-lg shadow-md" key={index}>
                <svg aria-hidden="true" className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
              <blockquote>
              <p className="mt-2 text-lg font-medium text-gray-900 relative">
                &#8220;
                {testimonial.speech}
                &#8221;
              </p>
              </blockquote>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={testimonial.image}
                      alt="avatar"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {testimonial.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.designation}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!isExpanded && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="text-blue-500 underline"
                onClick={handleShowMoreClick}
              >
                See More
              </button>
            </div>
          )}
          {isExpanded && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="text-blue-500 underline ml-2"
                onClick={handleHideClick}
              >
                Hide
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Use SSR here....
export default Testimonials;
