import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Greetings from "@/components/misc/landings.tsx/greetings";
import { GenericProps } from "@/utils/types";
import Hero from "@/components/misc/landings.tsx/hero";
import AppLists from "@/components/misc/landings.tsx/appLists";
const Home = ({ apps }: GenericProps) => {
  if (!apps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-txt gap-10 mt-24">
      <Greetings />
      <Hero />
      <AppLists apps={apps} />
      <div className="bg-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What people are saying
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mt-2 text-lg font-medium text-gray-900">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                non risus. Suspendisse lectus tortor, dignissim sit amet,
                adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                diam. Maecenas ligula massa, varius a, semper congue, euismod
                non, mi."
              </p>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/images/default-avatar-green.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Jane Doe
                    </div>
                    <div className="text-sm text-gray-500">
                      CEO, Example Company
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mt-2 text-lg font-medium text-gray-900">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                non risus. Suspendisse lectus tortor, dignissim sit amet,
                adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                diam. Maecenas ligula massa, varius a, semper congue, euismod
                non, mi."
              </p>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/images/default-avatar-green.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-sm text-gray-500">
                      CTO, Example Company
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mt-2 text-lg font-medium text-gray-900">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                non risus. Suspendisse lectus tortor, dignissim sit amet,
                adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                diam. Maecenas ligula massa, varius a, semper congue, euismod
                non, mi."
              </p>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/images/default-avatar-green.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-sm text-gray-500">
                      CTO, Example Company
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mt-2 text-lg font-medium text-gray-900">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                non risus. Suspendisse lectus tortor, dignissim sit amet,
                adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                diam. Maecenas ligula massa, varius a, semper congue, euismod
                non, mi."
              </p>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/images/default-avatar-green.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-sm text-gray-500">
                      CTO, Example Company
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:9000/api/fav-apps");
    const apps = res.data;
    return { props: { apps } };
  } catch (error: any) {
    console.error(error.message);
    return { props: { apps: [] } };
  }
};

export default Home;
