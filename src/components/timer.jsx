import { useEffect, useState } from 'react';
import timerLogo from 'public/timerLogo.png'
import Image from 'next/image'

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
    setText(`סט מספר ${setNum}`)
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleResetTime = () => {
    setSeconds(isRest ? 3 : 4);
    setIsRunning(false)
  }

  const handleReset = () => {
  /*const handleReset = async () => {
    try {
      await fetch('http://127.0.0.1:3000/api/excersices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'new exercise' }), // Change 'new exercise' to whatever type you want to add
        
      });
    } catch (error) {
      console.error('Error adding exercise:', error);
    }*/
  
    setNumSet(1)
    setIsRest(false);
    setSeconds(4);
    setIsRunning(false);
    setText("! בואו נתחיל");
  };
  
  const IncreaseSet = () => {
    if(setNum !== 3 && text != "! בואו נתחיל") {
      setNumSet(prevSet => prevSet + 1)
      setText(`סט מספר ${setNum + 1}`)
      setIsRest(false);
      setSeconds(4);
      setIsRunning(false);
    }
  }

  const DecreaseSet = () => {
    if(setNum !== 1 && text != "! בואו נתחיל") {
      setNumSet(prevSet => prevSet - 1)
      setText(`סט מספר ${setNum - 1}`)
      setIsRest(false);
      setSeconds(4);
      setIsRunning(false);
      }
  }

  useEffect(() => {
    if (seconds === 0) {
      if(isRest && setNum === 3) {
        handleReset()
        setText("\u{1F504} להחליף תחנות")
        return
      }
      if(isRest) {
        console.log("Raz")
        console.log(setNum)
        setNumSet(prevSetNum => {
          const updatedNumSet = prevSetNum + 1;
          setText(`סט מספר ${updatedNumSet}`);
          return updatedNumSet;
          });
      }
      setIsRest((prev) => !prev); // Toggle between 40 and 30 seconds
      setSeconds(isRest ? 4 : 3); // Reset the timer to the new duration
      setIsRunning(true); // Start the timer again
    }
  }, [seconds, isRest]);

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-5 flex flex-col justify-center items-center bg-contain bg-center bg-no-repeat">
      <h1 className="laptop:text-[110px] desktop:text-[192px] font-semibold text-white desktop:-mt-40">
        {!isRest ? '\u{1F4AA} תנו בראש' : '\u{1F634} מנוחה'}
      </h1>

      <div className="flex flex-col items-center">
        <Image src={timerLogo.src} alt="Timer Logo" width={1400} height={100} />
        <div className={`absolute dekstop:-mt-32 laptop:text-[150px] laptop:ml-[150px] desktop:text-[480px] desktop:ml-[270px] font-bold ${!isRest ? 'text-green-500' : 'text-red-500'}`}>
          {formatTime(seconds)}
        </div>
      </div>

      {/* <h1 className="text-8xl font-semibold mb-5 text-white">{setNum} סט מספר</h1> */}
      <h1 className="laptop:text-[85px] desktop:text-[164px] font-semibold text-white">{text}</h1>

      <div className="flex gap-12 desktop:mt-10 laptop:mt-5">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="desktop:w-40 deksotp:h-24 laptop:w-20 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none font-bold">
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="desktop:w-40 deksotp:h-24 laptop:w-20 h-14 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none font-bold">
            Stop
          </button>
        )}

        <button
          onClick={handleResetTime}
          className="desktop:w-40 deksotp:h-24 laptop:w-20 h-14 bg-lime-500 hover:bg-lime-600 text-white rounded-md focus:outline-none font-bold">
          Reset time
        </button>

        <button
          onClick={IncreaseSet}
          className="desktop:w-40 dekstop:h-24 laptop:w-20 h-14 bg-teal-500 hover:bg-teal-600  text-white rounded-md focus:outline-none font-bold">
          +
        </button>

        <button
          onClick={DecreaseSet}
          className="desktop:w-40 deksotp:h-24 laptop:w-20 h-14 bg-purple-500 hover:bg-purple-600 text-white rounded-md focus:outline-none font-bold">
          -
        </button>

        <button
          onClick={handleReset}
          className="desktop:w-40 deksotp:h-24 laptop:w-20 h-14 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none font-bold">
          Reset
        </button>
      </div>
    </div>
  );
}
