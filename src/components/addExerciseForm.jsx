import { useEffect, useState } from 'react';

export default function AddExerciseForm({onConfirm, onClose, exercises }) {
  const [exerciseName, setExerciseName] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const houses = ['Squat','Push','Deadlift','Pull','Lunge','Twist', 'Aerobic_Abs']

  const handleSelectChange = (e) => {
    setSelectedHouse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHouse === '') {
      return;
    }
    // Check if the exercise already exists in the state
    const isExerciseExist = exercises.some(exercise => exercise.name === exerciseName);

    if (isExerciseExist) {
      console.log('Exercise already exists.');
      return; // Exit the function if exercise already exists
    }
    // Call the function to add exercise and pass the exercise name
    onConfirm({'house': selectedHouse.toLowerCase() ,'name' : exerciseName});
    onClose();
  };

  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl tv:text-5xl font-semibold mb-4 flex justify-center">Create Exercise</h2>
          <label className="tv:text-4xl block text-gray-700">House:</label>
            <select
                value={selectedHouse}
                onChange={handleSelectChange}
                className="tv:text-3xl mb-4 tv:my-4 w-[75%] border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
                <option value="">Select a house</option>
                {houses.map((house, index) => (
                <option key={index} value={house}>{house === 'Aerobic_Abs' ? 'Aerobic/Abs' : house}</option>
                ))}
            </select>
          <label className="tv:text-4xl block text-gray-700">Exercise Name:</label>
            <input
                type="text"
                value={exerciseName}
                onInput={(e) => setExerciseName(e.target.value)}
                className="tv:my-4 tv:text-3xl mb-4 w-[75%] border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          <div className="flex justify-between gap-8">
              <button
              type="submit"
              className="form-button bg-lime-400 hover:bg-lime-500">
              Confirm
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
    )
}

    // <>
    //   {isOpen && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    //         {/* <span className="" onClick={onClose}>&times;</span> */}
    //         <h2 className="text-xl font-semibold mb-4">Add Exercise</h2>
    //         <form onSubmit={handleSubmit}>
    //           <label>
    //             Exercise Name:
    //             <input type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
    //           </label>
    //           <button type="submit">Add Exercise</button>
    //         </form>
    //       </div>
    //   )}
    // </>