import { useState, useEffect } from 'react';
import AddExerciseForm from './addExerciseForm';

export default function CreateTrainingForm({onConfirm, onClose, trainings, fetched_exercises }) {
  const [trainingName, setTrainingName] = useState('');
  const [selectedSquat, setSelectedSquat] = useState('');
  const [selectedSquatAerobicAbs, setSelectedSquatAerobicAbs] = useState('');
  const [selectedPush, setSelectedPush] = useState('');
  const [selectedPushAerobicAbs, setSelectedPushAerobicAbs] = useState('');
  const [selectedDeadlift, setSelectedDeadlift] = useState('');
  const [selectedDeadliftAerobicAbs, setSelectedDeadliftAerobicAbs] = useState('');
  const [selectedPull, setSelectedPull] = useState('');
  const [selectedPullAerobicAbs, setSelectedPullAerobicAbs] = useState('');
  const [selectedLunge, setSelectedLunge] = useState('');
  const [selectedLungeAerobicAbs, setSelectedLungeAerobicAbs] = useState('');
  const [selectedTwist, setSelectedTwist] = useState('');
  const [selectedTwistAerobicAbs, setSelectedTwistAerobicAbs] = useState('');
  const [AddExerciseDialogOpen, setIsAddExerciseDialogOpen] = useState(false);
  const [exercises, setExercises] = useState(fetched_exercises);

  // useEffect to update exercises when fetched_exercises changes
  useEffect(() => {
    setExercises(fetched_exercises);
  }, [fetched_exercises]);

  const exerciseCategories = [
    { name: 'Squat House', key: 'squat' },
    { name: 'Push House', key: 'push' },
    { name: 'Deadlift House', key: 'deadlift' },
    { name: 'Pull House', key: 'pull' },
    { name: 'Lunge House', key: 'lunge' },
    { name: 'Twist House', key: 'twist' },
    { name: 'Aerobic_Abs House', key: 'aerobic_abs'}
  ];

  const categorizedExercises = exerciseCategories.reduce((acc, category) => {
    acc[category.key] = exercises.filter(exercise => exercise.house === category.key);
    return acc;
  }, {});
  console.log(categorizedExercises)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the training already exists in the state
    const isTrainingExist = trainings.some(training => training.name === trainingName);

    if (isTrainingExist) {
      console.log('Training already exists.');
      return; // Exit the function if exercise already exists
    }
    // // Call the function to add exercise and pass the exercise name
    onConfirm({'name': trainingName,
                'squat' : selectedSquat,
                'squat_aerobic_abs' : selectedSquatAerobicAbs,
                'push' : selectedPush,
                'push_aerobic_abs' : selectedPushAerobicAbs,
                'deadlift' : selectedDeadlift,
                'deadlift_aerobic_abs' : selectedDeadliftAerobicAbs,
                'pull' : selectedPull,
                'pull_aerobic_abs' : selectedPullAerobicAbs,
                'lunge' : selectedLunge,
                'lunge_aerobic_abs' : selectedLungeAerobicAbs,
                'twist' : selectedTwist,
                'twist_aerobic_abs' : selectedTwistAerobicAbs})
    onClose();
  };

  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };

  const getRandomExercise = (category) => {
    const exercises = categorizedExercises[category];
    if (exercises.length > 0) {
      return exercises[Math.floor(Math.random() * exercises.length)].name;
    }
    return
  };

  const shuffleExercises = () => {
    setSelectedSquat(getRandomExercise('squat'));
    setSelectedSquatAerobicAbs(getRandomExercise('aerobic_abs'));
    setSelectedPush(getRandomExercise('push'));
    setSelectedPushAerobicAbs(getRandomExercise('aerobic_abs'));
    setSelectedDeadlift(getRandomExercise('deadlift'));
    setSelectedDeadliftAerobicAbs(getRandomExercise('aerobic_abs'));
    setSelectedPull(getRandomExercise('pull'));
    setSelectedPullAerobicAbs(getRandomExercise('aerobic_abs'));
    setSelectedLunge(getRandomExercise('lunge'));
    setSelectedLungeAerobicAbs(getRandomExercise('aerobic_abs'));
    setSelectedTwist(getRandomExercise('twist'));
    setSelectedTwistAerobicAbs(getRandomExercise('aerobic_abs'));
  };

  async function addExercise(exerciseData) {
    try {
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
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Create Training</h2>
            <label className="block text-gray-700">Training Name:</label>
            <input
                type="text"
                value={trainingName}
                onInput={(e) => setTrainingName(e.target.value)}
                className="mb-4 w-[47%] border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />

            {exerciseCategories.slice(0,6).map((category, i) => (
            <div key={i}>
              <label className="block text-gray-700">{category.name}:</label>
              <div className="select-exercises">
                <select
                  value={i === 0 ? selectedSquat : i === 1 ? selectedPush : i === 2 ? selectedDeadlift : i === 3 ? selectedPull : i === 4 ? selectedLunge : selectedTwist}
                  onChange={e => i === 0 ? setSelectedSquat(e.target.value) : i === 1 ? setSelectedPush(e.target.value) : i === 2 ? setSelectedDeadlift(e.target.value) : i === 3 ? setSelectedPull(e.target.value) : i === 4 ? setSelectedLunge(e.target.value) : setSelectedTwist(e.target.value)}
                  className="mb-4 w-[47%] border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select an exercise</option>
                  {categorizedExercises[category.key].map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                  ))}
                </select>

                <select
                  value={i === 0 ? selectedSquatAerobicAbs : i === 1 ? selectedPushAerobicAbs : i === 2 ? selectedDeadliftAerobicAbs : i === 3 ? selectedPullAerobicAbs : i === 4 ? selectedLungeAerobicAbs : selectedTwistAerobicAbs}
                  onChange={e => i === 0 ? setSelectedSquatAerobicAbs(e.target.value) : i === 1 ? setSelectedPushAerobicAbs(e.target.value) : i === 2 ? setSelectedDeadliftAerobicAbs(e.target.value) : i === 3 ? setSelectedPullAerobicAbs(e.target.value) : i === 4 ? setSelectedLungeAerobicAbs(e.target.value) : setSelectedTwistAerobicAbs(e.target.value)}
                  className="mb-4 w-[47%] border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select an exercise</option>
                  {categorizedExercises['aerobic_abs'].map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                  ))}
                </select>
              </div>
            </div>
            ))}        

            <div className="flex justify-between gap-8">
                <button
                type="submit"
                className="form-button bg-lime-400 hover:bg-lime-500">
                Confirm
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAddExerciseDialogOpen(true);
                  }}
                  className="form-button bg-yellow-400 hover:bg-yellow-500">
                  Add Exercise
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    shuffleExercises()
                  }}
                  className="form-button bg-pink-400 hover:bg-pink-500">
                  Shuffle
                </button>

                <button
                  onClick={handleCancel}
                  className="form-button bg-gray-400 hover:bg-gray-500">
                  Cancel
                </button>

                
            </div>
          </div>
      </form>

      {AddExerciseDialogOpen && <AddExerciseForm
        onConfirm={addExercise}
        onClose={() => setIsAddExerciseDialogOpen(false)}
        exercises={fetched_exercises}
      />}

    </div>
    )
}