import { useEffect, useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRest(false);
    setSeconds(4);
    setIsRunning(false);
  };

  useEffect(() => {
    if (seconds === 0) {
      setIsRest((prev) => !prev); // Toggle between 40 and 30 seconds
      setSeconds(isRest ? 4 : 3); // Reset the timer to the new duration
      setIsRunning(true); // Start the timer again
    }
  }, [seconds, isRest]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-[600px] h-[635px] flex flex-col justify-center items-center">
      {!isRest ? (
      <h1 className="text-8xl font-semibold mb-4 ">&#x1F4AA;תנו בראש</h1>
      ) : (
        <h1 className="text-8xl font-semibold mb-4">&#x1F634;מנוחה</h1>
      )}

      <div
        className={`text-[180px] font-bold mb-4 ${!isRest ? 'text-green-500' : 'text-red-500'}`}
      >
        {formatTime(seconds)}
      </div>
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none"
          >
            Stop
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}