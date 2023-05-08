import Link from "next/link";
import { useState, useEffect } from "react";

const Raffles = () => {
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    const weekNumber = Math.ceil(
      ((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
        86400000 +
        new Date(date.getFullYear(), 0, 1).getDay() +
        1) /
        7
    );
    setWeekNumber(weekNumber);
  }, []);

  return (
    <Link
      href="/raffle-draw"
      className="flex items-center lg:justify-center xl:justify-center pt-4 lg:pb-2 xl:pb-2 xs:ml-2 sm:ml-2 md:ml-2 lg:mr-12 xl:mr-12"
      style={{ fontFamily: "'Pacifico', cursive" }}
    >
      <p className="flex items-center justify-center text-white font-semibold text-sm bg-red-500 w-7 h-7 rounded-full mr-2">
        {weekNumber}
      </p>
      <span className="font-bold leading-none text-background">Raffle</span>
      <span className="font-bold leading-none text-yellow-400">Week</span>
    </Link>
  );
};

export default Raffles;
