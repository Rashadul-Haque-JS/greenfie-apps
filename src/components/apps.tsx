import React from 'react';
import Link from 'next/link';

interface AppIconProps {
  icon: string;
  href: string;
}

const AppIcon: React.FC<AppIconProps> = ({ icon, href }) => {
  return (
    <div >
      <a href={href} className="inline-block h-12 w-12 rounded-full overflow-hidden">
        <img src={'/image/greenfie.png'} className="object-cover h-full w-full" alt="App Icon" />
      </a>
    </div>
  );
};

export default AppIcon;
