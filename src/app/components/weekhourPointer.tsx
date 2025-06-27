import { useEffect, useState } from "react";

export default function WeekhourPointer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Calculate minutes since midnight
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  // Percentage of the day passed (1440 minutes in a day)
  const percentOfDay = (minutesSinceMidnight / 1440) * 100;
  const verticalPosition = (24 * 80 * percentOfDay) / 100;

  const berlinTime = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  });

  return (
    <div
      className="absolute bg-red-400 mx-2 w-full h-1 overflow-visible flex items-center"
      style={{ top: `${verticalPosition}px`, transition: "top 0.5s linear" }}
    >
      <div className="bg-red-400 w-fit py-1 px-2 rounded-xl text-white z-50">
        {berlinTime}
      </div>
    </div>
  );
}
