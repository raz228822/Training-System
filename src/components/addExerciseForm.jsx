import { useState } from 'react';

export default function AddExerciseForm({onConfirm, onClose }) {
  const [exerciseName, setExerciseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to add exercise and pass the exercise name
    onConfirm({'type' : exerciseName});
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
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Enter Exercise</h2>
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