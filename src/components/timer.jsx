import { useEffect, useState } from 'react';
import timerLogo from 'public/timerLogo.png'
import Image from 'next/image'
import AddExerciseForm from './addExerciseForm';
import LoadTrainingForm from './LoadTrainingForm';
import AddTrainingForm from './addTrainingForm';

export default function Timer({tableData, setTableData, loadTrainingsOnTable}) {
  const [seconds, setSeconds] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [setNum, setNumSet] = useState(1);
  const [text, setText] = useState("! בואו נתחיל")
  const [title, setTitle] = useState('\u{1F4AA} תנו בראש')
  const [AddExerciseDialogOpen, setIsAddExerciseDialogOpen] = useState(false);
  const [LoadExerciseDialogOpen, setIsLoadExerciseDialogOpen] = useState(false);
  const [AddTrainingDialogOpen, setIsAddTrainingDialogOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [housesSwitch, setHousesSwitch] = useState(true);

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
    setTitle('\u{1F4AA} תנו בראש')
    setSeconds(4);
    setIsRunning(false);
    setText("! בואו נתחיל");
  };
  
  const IncreaseSet = () => {
    if(text === "! בואו נתחיל"){
        setText(`סט מספר ${setNum}`)
        setIsRest(false);
        setTitle('\u{1F4AA} תנו בראש')
        setSeconds(4);
        setIsRunning(false);
    }
    if(setNum !== 3 && text != "! בואו נתחיל") {
      if(!isRest) { // On green 40 seconds
        setIsRest(true);
        setTitle('\u{1F634} מנוחה')
        setSeconds(3);
      }
      else {
        setNumSet(prevSet => prevSet + 1)
        setText(`סט מספר ${setNum + 1}`)
        setIsRest(false);
        setTitle('\u{1F4AA} תנו בראש')
        setSeconds(4);
      }
      setIsRunning(false);
    }
  }

  const DecreaseSet = () => {
    if(text === "! בואו נתחיל")
      return
    if(setNum === 1 && !isRest) {
      setText("! בואו נתחיל")
      return
    }
    if(!isRest) {
      setNumSet(prevSet => prevSet - 1)
      setText(`סט מספר ${setNum - 1}`)
      setIsRest(true)
      setTitle('\u{1F634} מנוחה')
      setSeconds(3)
    }
    else {
      setIsRest(false);
      setTitle('\u{1F4AA} תנו בראש')
      setSeconds(4);
    }
    setIsRunning(false);
    }

  useEffect(() => {
    console.log(setNum)
  },[setNum])

  useEffect(() => {
    if (seconds === 0) {
      if(setNum === 3) {
        if(text === "\u{1F504} להחליף תחנות") {
          handleReset()
          return
        }
        setIsRest(true);
        setTitle('\u{1F389}\u{1F389}\u{1F389}')
        setSeconds(3);
        setText("\u{1F504} להחליף תחנות")
        switchNames()
        return
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
      setTitle(isRest ? '\u{1F4AA} תנו בראש' : '\u{1F634} מנוחה')
      setIsRunning(true); // Start the timer again
    }
  }, [seconds, isRest]);

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const switchNames = () => {
    setHousesSwitch(prevHousesSwitch => {
        const newHousesSwitch = !prevHousesSwitch;

        if (newHousesSwitch) {
            // Store the name1 and name2 of the last object
            let lastName1 = tableData[tableData.length - 1].name1;
            let lastName2 = tableData[tableData.length - 1].name2;

            // Shift name1 and name2 from each object to the next
            for (let i = tableData.length - 1; i > 0; i--) {
                tableData[i].name1 = tableData[i - 1].name1;
                tableData[i].name2 = tableData[i - 1].name2;
            }

            // Set the name1 and name2 of the first object to the stored values
            tableData[0].name1 = lastName1;
            tableData[0].name2 = lastName2;
        }

        // Reverse the name1 and name2 in each exercise
        const updatedTableData = tableData.map((exercise) => {
            const temp = exercise.name1;
            exercise.name1 = exercise.name2;
            exercise.name2 = temp;
            return exercise;
        });
        setTableData([...updatedTableData]); // Trigger re-render
        return newHousesSwitch;
    });
};

useEffect(() => {
  // Function to fetch data
  const fetchData = async () => {
    try {
      const trainingResponse = await fetch('/api/trainings');
      if (!trainingResponse.ok) {
        throw new Error('Failed to load trainings');
      }
      const trainingData = await trainingResponse.json();
      setTrainings(trainingData);

      const exerciseResponse = await fetch('/api/exercises');
      if (!exerciseResponse.ok) {
        throw new Error('Failed to load exercises');
      }
      const exerciseData = await exerciseResponse.json();
      setExercises(exerciseData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Fetch data when component mounts
  fetchData();
}, []); // Empty dependency array ensures this effect runs only once on mount

  async function addExercise(exerciseData) {
    try {
      // Check if the exercise already exists in the state
      const isExerciseExist = exercises.some(exercise => exercise.name === exerciseData.name);

      if (isExerciseExist) {
        console.log('Exercise already exists.');
        return; // Exit the function if exercise already exists
      }
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData) // Convert exerciseData to JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to create exercise');
      }
      setExercises(prevExercises => [...prevExercises, exerciseData]);
      console.log(exercises)
      //fetchData()
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  }

  async function addTraining(trainingData) {
    try {
      const response = await fetch('/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainingData) // Convert trainingData to JSON string
      });

      if (!response.ok) {
        console.log(trainingData)
        throw new Error('Failed to create exercise');
      }
      fetchData()
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  }

  return (
    <div className="mx-5 flex flex-col justify-center items-center bg-contain bg-center bg-no-repeat">
      <h1 className="laptop:text-[110px] desktop:text-[192px] tv:text-[290px] font-semibold text-white desktop:-mt-24 tv:-mt-60">
        {title}
      </h1>

      <div className="flex flex-col items-center">
        <Image src={timerLogo.src} alt="Timer Logo" width={1600} height={100} />
        <div className={`absolute tv:-mt-36 desktop:-mt-28 laptop:-mt-14 laptop:text-[215px] laptop:ml-[150px] desktop:text-[420px] desktop:ml-[270px] tv:text-[550px] font-bold ${!isRest ? 'text-green-500' : 'text-red-500'}`}>
          {formatTime(seconds)}
        </div>
      </div>

      <h1 className="laptop:text-[80px] desktop:text-[164px] tv:text-[210px] font-semibold text-white">{text}</h1>

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
            onClick={() => setIsAddExerciseDialogOpen(true)}
            className="button bg-yellow-400 hover:bg-yellow-500">
            Add Exercise
        </button>
        <button
            //onClick={() => setIsDialogOpen(true)}]
            onClick={() => setIsLoadExerciseDialogOpen(true)}
            className="button bg-slate-400 hover:bg-slate-500">
            Load Training
        </button>
        <button
            onClick={() => setIsAddTrainingDialogOpen(true)}
            //onClick={createTraining}
            className="button bg-emerald-400 hover:bg-emerald-500">
            Create Training
        </button>

        {AddExerciseDialogOpen && <AddExerciseForm
          onConfirm={addExercise}
          onClose={() => setIsAddExerciseDialogOpen(false)}
           />}

        {LoadExerciseDialogOpen && <LoadTrainingForm
          onConfirm={loadTrainingsOnTable}
          onClose={() => setIsLoadExerciseDialogOpen(false)}
          trainings={trainings}
           />}

        {AddTrainingDialogOpen && <AddTrainingForm
          onConfirm={addTraining}
          onClose={() => setIsAddTrainingDialogOpen(false)}
          exercises={exercises}
           />}

      </div>
    </div>
  );
}
