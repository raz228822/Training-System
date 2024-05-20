import { useEffect, useState } from 'react';
import timerLogo from 'public/timerLogo.png'
import Image from 'next/image'
import AddExerciseForm from './addExerciseForm';

export default function Timer() {
  const [seconds, setSeconds] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [setNum, setNumSet] = useState(1);
  const [text, setText] = useState("! בואו נתחיל")
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setNumSet(1)
    setIsRest(false);
    setSeconds(4);
    setIsRunning(false);
    setText("! בואו נתחיל");
  };
  
  const IncreaseSet = () => {
    if(text === "! בואו נתחיל"){
        setText(`סט מספר ${setNum}`)
        setIsRest(false);
        setSeconds(4);
        setIsRunning(false);
    }
    if(setNum !== 3 && text != "! בואו נתחיל") {
      if(!isRest) { // On green 40 seconds
        setIsRest(true);
        setSeconds(3);
      }
      else {
        setNumSet(prevSet => prevSet + 1)
        setText(`סט מספר ${setNum + 1}`)
        setIsRest(false);
        setSeconds(4);
      }
      setIsRunning(false);
    }
  }

  const DecreaseSet = () => {
    if(text === "סט מספר 1"){
      setText("! בואו נתחיל")
    }
    if(setNum !== 1 && text != "! בואו נתחיל") {
      if(!isRest) {
        setIsRest(true)
        setSeconds(3)
      }
      else {
        setNumSet(prevSet => prevSet - 1)
        setText(`סט מספר ${setNum - 1}`)
        setIsRest(false);
        setSeconds(4);
        }
        setIsRunning(false);
      }
  }

  useEffect(() => {
    if (seconds === 0) {
      if(setNum === 3) {
        if(text === "\u{1F504} להחליף תחנות") {
          console.log("im here")
          handleReset()
          return
        }
        setIsRest(true);
        setSeconds(3);
        setText("\u{1F504} להחליף תחנות")
        return
        // handleReset()
        // setText("\u{1F504} להחליף תחנות")
        // return
      }
      if(isRest) {
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

  async function AddExercise(exerciseData) {
    try {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData) // Convert exerciseData to JSON string
      });

      //if (!response.ok) {
      if(response.status === 200) { // ????????
        throw new Error('Failed to create exercise');
      }

      const responseData = await response.json();
      console.log("resData = " + responseData)
      return responseData;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  }

  return (
    <div className="mx-5 flex flex-col justify-center items-center bg-contain bg-center bg-no-repeat">
      <h1 className="laptop:text-[110px] desktop:text-[192px] font-semibold text-white desktop:-mt-24">
        {!isRest ? '\u{1F4AA} תנו בראש' : '\u{1F634} מנוחה'}
      </h1>

      <div className="flex flex-col items-center">
        <Image src={timerLogo.src} alt="Timer Logo" width={1400} height={100} />
        <div className={`absolute desktop:-mt-32 laptop:-mt-14 laptop:text-[215px] laptop:ml-[150px] desktop:text-[450px] desktop:ml-[270px] font-bold ${!isRest ? 'text-green-500' : 'text-red-500'}`}>
          {formatTime(seconds)}
        </div>
      </div>

      {/* <h1 className="text-8xl font-semibold mb-5 text-white">{setNum} סט מספר</h1> */}
      <h1 className="laptop:text-[85px] desktop:text-[164px] font-semibold text-white">{text}</h1>

      <div className="flex gap-12 desktop:my-14 laptop:my-5">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="button bg-blue-500 hover:bg-blue-600">
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="button bg-red-500 hover:bg-red-600">
            Stop
          </button>
        )}

        <button
          onClick={handleResetTime}
          className="button bg-lime-500 hover:bg-lime-600 text-white">
          Reset time
        </button>

        <button
          onClick={IncreaseSet}
          className="button bg-teal-500 hover:bg-teal-600 ">
          +
        </button>

        <button
          onClick={DecreaseSet}
          className="button bg-purple-500 hover:bg-purple-600">
          -
        </button>

        <button
          onClick={handleReset}
          className="button bg-gray-500 hover:bg-gray-600">
          Reset
        </button>
      </div>

      <div className="" >
        <button
            onClick={() => setIsDialogOpen(true)}
            className="button bg-yellow-400 hover:bg-yellow-500">
            Add Exercise
        </button>
        {isDialogOpen && <AddExerciseForm
          onConfirm={AddExercise}
          onClose={() => setIsDialogOpen(false)}
           />}
      </div>
    </div>
  );
}
