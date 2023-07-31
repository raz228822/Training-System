import { useEffect, useState } from 'react';
import Image from 'next/image'
import timerLogo from 'public/timerLogo.png'


export default function Timer() {
  const [seconds, setSeconds] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [setNum, setNumSet] = useState(1);
  const [text, setText] = useState("! בואו נתחיל")

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
    setNumSet(prevSetNum => prevSetNum + 1);
    setText(`סט מספר ${setNum}`)
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setNumSet(1)
    setIsRest(false);
    setSeconds(4);
    setIsRunning(false);
  };

  useEffect(() => {
    if (seconds === 0) {
      if(!isRest && setNum === 4) {
        setText("\u{1F504}להחליף תחנות")
        handleReset()
        return
      }
      if(isRest) {
        console.log("Raz")
        console.log(setNum)
        setNumSet(setNum + 1)
        setText(`סט מספר ${setNum}`)
        
      }
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
    <div className="ml-5 p-4 rounded-lg shadow-md w-[800px] h-[635px] flex flex-col justify-center items-center bg-contain bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${timerLogo.src})`}} >
      {!isRest ? (
      <h1 className="text-8xl font-semibold mb-4 text-white">&#x1F4AA;תנו בראש</h1>
      ) : (
        <h1 className="text-8xl font-semibold mb-4 text-white">&#x1F634;מנוחה</h1>
      )}

      <div
        className={`text-[180px] font-bold my-12 ml-[184px] ${!isRest ? 'text-green-500' : 'text-red-500'}`}
      >
        {formatTime(seconds)}
      </div>

      {/* <h1 className="text-8xl font-semibold mb-5 text-white">{setNum} סט מספר</h1> */}
      <h1 className="text-8xl font-semibold mb-5 text-white">{text}</h1>

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
