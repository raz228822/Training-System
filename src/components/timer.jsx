import { useEffect, useState } from 'react';
import timerLogo from 'public/timerLogo.png'
import Image from 'next/image'
// import LoadTrainingForm from './LoadTrainingForm';
// import CreateTrainingForm from './createTrainingForm';
import Confetti from 'react-confetti';
import { useAudio } from "react-use";


export default function Timer({tableData, setTableData, loadTrainingsOnTable}) {
  const [seconds, setSeconds] = useState(23);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [setNum, setNumSet] = useState(1);
  const [text, setText] = useState("! בואו נתחיל")
  const [title, setTitle] = useState('\u{1F4AA} תנו בראש')
  // const [LoadTrainingDialogOpen, setIsLoadTrainingDialogOpen] = useState(false);
  // const [CreateTrainingDialogOpen, setIsCreateTrainingDialogOpen] = useState(false);
  // const [trainings, setTrainings] = useState([]);
  // const [exercises, setExercises] = useState([]);
  const [housesSwitch, setHousesSwitch] = useState(false);
  const [houseGroupSwitch, setHouseGroupSwitch] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fiveTOoneGo, fiveTOoneGoState, fiveTOoneGoControls, fiveTOoneGoRef] = useAudio({ src: "/5to1go.mp3", autoPlay: false });
  const [fiveTOoneRest, fiveTOoneRestState, fiveTOoneRestControls, fiveTOoneRestRef] = useAudio({ src: "/5to1rest.mp3", autoPlay: false });
  const [half, halftState, halfControls, halfRef] = useAudio({ src: "/half.mp3", autoPlay: false });


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
    setSeconds(isRest ? 6 : 7);
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
      setSeconds(6)
    }
    else {
      setIsRest(false);
      setTitle('\u{1F4AA} תנו בראש')
      setSeconds(7);
    }
    setIsRunning(false);
    }

  useEffect(() => {
    console.log(setNum)
  },[setNum])

  useEffect(() => {
    if (seconds === 0) {
      if(setNum === 3) {
        if(text === "\u{1F504} החלפה") {
          handleReset()
          return
        }
        setIsRest(true);
        setTitle('\u{1F389}\u{1F389}\u{1F389}')
        setSeconds(3);
        triggerConfetti();
        setText("\u{1F504} החלפה")
        switchNames()
        setHousesSwitch(!housesSwitch)
        if(housesSwitch) {
          switchFirstThreeHouses()
          switchLastThreeHouses()
          setHouseGroupSwitch(prevHouseGroupSwitch => prevHouseGroupSwitch + 1);
          if(houseGroupSwitch === 2)  {
            setHouseGroupSwitch(0);
            switchBetweenGroups()
          }
        }
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
      setSeconds(isRest ? 7 : 6); // Reset the timer to the new duration
      setTitle(isRest ? '\u{1F4AA} תנו בראש' : '\u{1F634} מנוחה')
      setIsRunning(true); // Start the timer again
    }
  }, [seconds, isRest]);

  // Function to trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Stop confetti after 5 seconds
  };

  const handleAudio = () => {
    if(text !== '\u{1F4AA} תנו בראש' && seconds === 5) {
      isRest ? fiveTOoneGoControls.play() : fiveTOoneRestControls.play()
    }
    if(seconds === 20)
      halfControls.play();
  }

  useEffect(() => {
      handleAudio();
  }, [seconds]);

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const switchNames = () => {
    // Reverse the name1 and name2 in each exercise
    const updatedTableData = tableData.map((exercise) => {
      const temp = exercise.name1;
      exercise.name1 = exercise.name2;
      exercise.name2 = temp;
      return exercise;
    });
  
    setTableData([...updatedTableData]); // Trigger re-render
  };
  
  // Switch houses 1-3
  const switchFirstThreeHouses = () => {
    // Store the last names of the first group of houses
    const lastNames = [];
    for (let i = 0; i < 3; i++) {
      lastNames.push({ name1: tableData[i].name1, name2: tableData[i].name2 });
    }

    // Shift names inside the houses from each object to the next within the group
    for (let i = 2; i > 0; i--) {
      tableData[i].name1 = tableData[i - 1].name1;
      tableData[i].name2 = tableData[i - 1].name2;
    }

    // Set the last names to the first object within the group
    tableData[0].name1 = lastNames[2].name1;
    tableData[0].name2 = lastNames[2].name2;
  };

  // Switch houses 4-6
  const switchLastThreeHouses = () => {
    // Store the last names of the second group of houses
    const lastNames = [];
    for (let i = 3; i < tableData.length; i++) {
      lastNames.push({ name1: tableData[i].name1, name2: tableData[i].name2 });
    }

    // Shift names inside the houses from each object to the next within the group
    for (let i = tableData.length - 1; i > 3; i--) {
      tableData[i].name1 = tableData[i - 1].name1;
      tableData[i].name2 = tableData[i - 1].name2;
    }

    // Set the last names to the first object within the group
    tableData[3].name1 = lastNames[lastNames.length - 1].name1;
    tableData[3].name2 = lastNames[lastNames.length - 1].name2;
  };

  // Switch houses 1-3 with houses 4-6
  const switchBetweenGroups = () => {
    // Store the names of the first group of houses
    const firstGroupNames = [];
    for (let i = 0; i < 3; i++) {
      firstGroupNames.push({ name1: tableData[i].name1, name2: tableData[i].name2 });
    }

    // Store the names of the second group of houses
    const secondGroupNames = [];
    for (let i = 3; i < tableData.length; i++) {
      secondGroupNames.push({ name1: tableData[i].name1, name2: tableData[i].name2 });
    }

    // Switch names between the groups
    for (let i = 0; i < 3; i++) {
      tableData[i].name1 = secondGroupNames[i].name1;
      tableData[i].name2 = secondGroupNames[i].name2;
      tableData[i + 3].name1 = firstGroupNames[i].name1;
      tableData[i + 3].name2 = firstGroupNames[i].name2;
    }
  };

  // useEffect(() => {
  //       // Function to fetch data
  //       const fetchData = async () => {
  //         try {
  //           const trainingResponse = await fetch('/api/trainings');
  //           if (!trainingResponse.ok) {
  //             throw new Error('Failed to load trainings');
  //           }
  //           const trainingData = await trainingResponse.json();
  //           setTrainings(trainingData);

  //           const exerciseResponse = await fetch('/api/exercises');
  //           if (!exerciseResponse.ok) {
  //             throw new Error('Failed to load exercises');
  //           }
  //           const exerciseData = await exerciseResponse.json();
  //           setExercises(exerciseData);
  //         } catch (error) {
  //           console.error('Error loading data:', error);
  //         }
  //       };

  //     // Fetch data when component mounts
  //     fetchData();
  //   }, []); // Empty dependency array ensures this effect runs only once on mount

  // async function createTraining(trainingData) {
  //   try {
  //     const response = await fetch('/api/trainings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(trainingData) // Convert trainingData to JSON string
  //     });

  //     if (!response.ok) {
  //       console.log(trainingData)
  //       throw new Error('Failed to create exercise');
  //     }
  //     setTrainings(prevTrainings => [...prevTrainings, trainingData]);
  //     const responseData = await response.json();
  //     return responseData;
  //   } catch (error) {
  //     console.error('Error creating exercise:', error);
  //     throw error;
  //   }
  // }

      return (
        <div className="mx-5 flex flex-col justify-center items-center bg-contain bg-center bg-no-repeat">
          {showConfetti && <Confetti />}
          {fiveTOoneGo}
          {fiveTOoneRest}
          {half}
          
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

          <div>
            {/* <button
                onClick={() => setIsLoadTrainingDialogOpen(true)}
                className="button bg-slate-400 hover:bg-slate-500">
                Load Training
            </button>

            <button
                onClick={() => setIsCreateTrainingDialogOpen(true)}
                className="button bg-emerald-400 hover:bg-emerald-500">
                Create Training
            </button> */}

            {/* {LoadTrainingDialogOpen && <LoadTrainingForm
              onConfirm={loadTrainingsOnTable}
              onClose={() => setIsLoadTrainingDialogOpen(false)}
              trainings={trainings}
              />}

            {CreateTrainingDialogOpen && <CreateTrainingForm
              onConfirm={createTraining}
              onClose={() => setIsCreateTrainingDialogOpen(false)}
              trainings={trainings}
              fetched_exercises={exercises}
              />} */}
          </div>
        </div>
      );
}
