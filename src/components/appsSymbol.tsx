
import Link from "next/link";
export interface AppPage {
  image: string;
  name: string;
  page: string;
}


const AppSymbol = ({ image, name, page }: AppPage) => {
  return (
    <Link href={page} className='flex flex-col justify-center'>
      <div className="w-20 h-20 md:w-12 md:h-12 lg:w-24 lg:h-24 xl:w-24 xl:h-24  rounded-lg overflow-hidden mt-2">
         <img src={image} className="w-full h-full object-cover" alt="page icon" /></div>
      <p className="text-gray-800 text-center md:text-start p-3 md:pt-3 md:p-0 md:text-xs">{name}</p>
    </Link>
  );
};

export default AppSymbol;