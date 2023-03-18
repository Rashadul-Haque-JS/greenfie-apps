import Link from "next/link";
import pathname from "./pathname";
const DeshboardLink = ()=> {
  return (
    <>
      {pathname() === '/deshboard'? (
        <span className='flex items-center p-2 text-base font-normal text-txt rounded-lg'>
          <svg className='w-6 h-6 text-txt transition duration-75 group-hover:text-background dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
            <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
          </svg>
          <span className='ml-3 text-[#566573]'>My Dashboard</span>
        </span>
      ) : (
        <Link href='/deshboard' className='flex items-center p-2 text-base font-normal text-txt rounded-lg hover:text-background'>
          <svg className='w-6 h-6 text-txt transition duration-75 group-hover:text-background dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
            <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
          </svg>
          <span className='ml-3'>My Dashboard</span>
        </Link>
      )}
    </>
  );
}
export default DeshboardLink