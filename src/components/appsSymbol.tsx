
import Link from "next/link";

export interface AppPage {
  image: string;
  name: string;
  page: string;
}


const AppSymbol = ({ image, name, page }: AppPage) => {
  return (
    <Link href={page} className='flex flex-col justify-center items-center'>
      <div className="w-24 h-24 rounded-lg overflow-hidden mt-2">
         <img src={image} className="w-full h-full object-cover" /></div>
      <p className="text-gray-800 text-center p-3">{name}</p>
    </Link>
  );
};

export default AppSymbol;