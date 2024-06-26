import { useEffect, useState } from 'react';

export default function EditDeleteExerciseForm({ onClose, fetched_exercises }) {
  const [exerciseName, setExerciseName] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const houses = ['Squat', 'Push', 'Deadlift', 'Pull', 'Lunge', 'Twist', 'Aerobic_Abs'];
  const [exercises, setExercises] = useState(fetched_exercises);

  // const exerciseCategories = [
  //   { name: 'Squat House', key: 'squat' },
  //   { name: 'Push House', key: 'push' },
  //   { name: 'Deadlift House', key: 'deadlift' },
  //   { name: 'Pull House', key: 'pull' },
  //   { name: 'Lunge House', key: 'lunge' },
  //   { name: 'Twist House', key: 'twist' },
  //   { name: 'Aerobic/Abs House', key: 'aerobic_abs' }
  // ];

  // useEffect to update exercises when fetched_exercises changes
  useEffect(() => {
    setExercises(fetched_exercises);
  }, [fetched_exercises]);

  useEffect(() => {
    console.log(exercises)
  }, [exercises])

  const handleHouseSelectChange = (e) => {
    setSelectedHouse(e.target.value);
    setSelectedExercise('');
  };

  const handleExerciseSelectChange = (e) => {
    setSelectedExercise(e.target.value);
    console.log(findExerciseIdByName(selectedExercise))
  };

  // Function to find exercise ID by name
  function findExerciseIdByName(exerciseName) {
  const exercise = exercises.find(exercise => exercise.name === exerciseName);
  return exercise ? exercise._id : null;
}



  const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedHouse === '' || selectedExercise === '') {
    return;
  }
  const exerciseId = findExerciseIdByName(selectedExercise);
  if (!exerciseId) {
    console.error(`Exercise with name "${selectedExercise}" not found.`);
    return;
  }
  try {
    const response = await fetch('/api/exercises', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: exerciseId, exerciseNewName: exerciseName }),
    });

    if (!response.ok) {
      throw new Error('Failed to update exercise');
    }
    const responseData = await response.json();
    console.log(responseData); // Handle success response as needed

    // Update local state with the new exercise name
    setExercises(prevExercises => (
      prevExercises.map(exercise => {
        if (exercise._id === exerciseId) {
          return { ...exercise, name: exerciseName }; // Update exercise name
        }
        return exercise; // Return unchanged exercise if not updated
      })
    ));

    onClose(); // Close the form after successful update
  } catch (error) {
    console.error('Error updating exercise:', error);
    // Handle error state or show error message to the user
  }
};
  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };




  // async function updateExercise(exerciseId, exerciseNewName) {
  //   try {
  //     if (!exerciseId) {
  //       throw new Error(`Exercise with name "${selectedExercise}" not found.`);
  //     }

  //     const response = await fetch('/api/exercises', {
  //       method: 'PATCH', // Assuming PATCH method is used for updating
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ exerciseId, exerciseNewName })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update exercise');
  //     }

  //     const responseData = await response.json();

  //     setExercises(prevExercises => {
  //       const updatedExercises = prevExercises.map(exercise => {
  //         if (exercise._id === responseData._id) {
  //           return responseData; // Replace the existing exercise with the updated one
  //         }
  //         return exercise; // Return unchanged exercise if not updated
  //       });
  //       return updatedExercises;
  //     });

  //     onClose(); // Close the form after successful update
  //     return responseData;
  //   } catch (error) {
  //     console.error('Error updating exercise:', error);
  //     throw error;
  //   }
  // }

  const filteredExercises = exercises.filter(exercise => exercise.house === selectedHouse.toLowerCase());

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl tv:text-5xl font-semibold mb-4 flex justify-center">Edit/Delete Exercise</h2>
          <label className="tv:text-4xl block text-gray-700">House:</label>
          <select
            value={selectedHouse}
            onChange={handleHouseSelectChange}
            className="tv:text-3xl mb-4 tv:my-4 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500">
            <option value="">Select a house</option>
            {houses.map((house, index) => (
              <option key={index} value={house.toLowerCase()}>{house === 'Aerobic_Abs' ? 'Aerobic/Abs' : house}</option>
            ))}
          </select>

          {selectedHouse && (
            <div>
              <label className="tv:text-4xl block text-gray-700">Exercise:</label>
              <select
                value={selectedExercise}
                onChange={handleExerciseSelectChange}
                className="tv:text-3xl mb-4 tv:my-4 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500">
                <option value="">Select an exercise</option>
                {filteredExercises.map((exercise, index) => (
                  <option key={index} value={exercise.name}>{exercise.name}</option>
                ))}
              </select>
            </div>
            )}

          <label className="tv:text-4xl block text-gray-700">New Name:</label>
          <input
            type="text"
            value={exerciseName}
            onInput={(e) => setExerciseName(e.target.value)}
            className="tv:my-4 tv:text-3xl mb-4 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-between gap-8">
            <button
              type="submit"
              className="form-button bg-lime-400 hover:bg-lime-500">
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="form-button bg-red-400 hover:bg-red-500">
              Delete
            </button>
            <button
              onClick={handleCancel}
              className="form-button bg-gray-400 hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
