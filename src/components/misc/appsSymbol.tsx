import Link from 'next/link';
import Image from 'next/image';

export interface AppPage {
  image: string;
  name: string;
  page: string;
}

const AppSymbol = ({ image, name, page }: AppPage) => {
  return (
    <Link href={page} className='flex flex-col justify-center'>
      <div className='w-20 h-20 md:w-12 md:h-12 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-lg overflow-hidden mt-2 bg-white apps-surface'>
        <Image src={image} className='w-full h-full object-cover z-50 brightness-110 contrast-125' alt='page icon' width={500} height={500} style={{borderStyle: 'none'}} />
      </div>
      <p className='text-txt text-center md:text-start p-3 md:pt-3 md:p-0 md:text-xs'>{name}</p>
    </Link>
  );
};

export default AppSymbol;
