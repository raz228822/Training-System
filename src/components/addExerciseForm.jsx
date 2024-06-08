import { useEffect, useState } from 'react';

export default function AddExerciseForm({onConfirm, onClose }) {
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
    // Call the function to add exercise and pass the exercise name
    onConfirm({'house': selectedHouse.toLowerCase() ,'name' : exerciseName});
    onClose();
  };

  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };
  
  // useEffect(() => {
  //   console.log(selectedHouse)
  // }, [selectedHouse])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Add Exercise</h2>
          <label className="block text-gray-700">House:</label>
            <select
                value={selectedHouse}
                onChange={handleSelectChange}
                className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
                <option value="">Select a house</option>
                {houses.map((house, index) => (
                <option key={index} value={house}>{house === 'Aerobic_Abs' ? 'Aerobic/Abs' : house}</option>
                ))}
            </select>
          <label className="block text-gray-700">Exercise Name:</label>
            <input
                type="text"
                value={exerciseName}
                onInput={(e) => setExerciseName(e.target.value)}
                className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          <div className="flex justify-between">
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