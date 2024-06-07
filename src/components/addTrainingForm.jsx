import { useState, useEffect } from 'react';

export default function AddTrainingForm({onConfirm, onClose, exercises }) {
  const [trainingName, setTrainingName] = useState('');
  const [selectedSquat1, setSelectedSquat1] = useState('');
  const [selectedSquat2, setSelectedSquat2] = useState('');
  const [selectedPush1, setSelectedPush1] = useState('');
  const [selectedPush2, setSelectedPush2] = useState('');
  const [selectedDeadlift1, setSelectedDeadlift1] = useState('');
  const [selectedDeadlift2, setSelectedDeadlift2] = useState('');
  const [selectedPull1, setSelectedPull1] = useState('');
  const [selectedPull2, setSelectedPull2] = useState('');
  const [selectedLunge1, setSelectedLunge1] = useState('');
  const [selectedLunge2, setSelectedLunge2] = useState('');
  const [selectedTwist1, setSelectedTwist1] = useState('');
  const [selectedTwist2, setSelectedTwist2] = useState('');
  console.log(exercises)

  const exerciseCategories = [
    { name: 'Squat House', key: 'squat' },
    { name: 'Push House', key: 'push' },
    { name: 'Deadlift House', key: 'deadlift' },
    { name: 'Pull House', key: 'pull' },
    { name: 'Lunge House', key: 'lunge' },
    { name: 'Twist House', key: 'twist' },
  ];

  const categorizedExercises = exerciseCategories.reduce((acc, category) => {
    acc[category.key] = exercises.filter(exercise => exercise.house === category.key);
    return acc;
  }, {});
  console.log(categorizedExercises)

  const handleSubmit = (e) => {
    e.preventDefault();
    // // Call the function to add exercise and pass the exercise name
    onConfirm({'training': trainingName,
                'squat_1' : selectedSquat1,
                'squat_2' : selectedSquat2,
                'push_1' : selectedPush1,
                'push_2' : selectedPush2,
                'deadlift_1' : selectedDeadlift1,
                'deadlift_2' : selectedDeadlift2,
                'pull_1' : selectedPull1,
                'pull_2' : selectedPull2,
                'lunge_1' : selectedLunge1,
                'lunge_2' : selectedLunge2,
                'twist_1' : selectedTwist1,
                'twist_2' : selectedTwist2})
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
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Add Training</h2>
            <label className="block text-gray-700">Training Name:</label>
            <input
                type="text"
                value={trainingName}
                onInput={(e) => setTrainingName(e.target.value)}
                className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />

            {exerciseCategories.map((category, i) => (
            <div key={i}>
              <label className="block text-gray-700">{category.name}:</label>
              <div className="select-trainings">
                <select
                  value={i === 0 ? selectedSquat1 : i === 1 ? selectedPush1 : i === 2 ? selectedDeadlift1 : i === 3 ? selectedPull1 : i === 4 ? selectedLunge1 : selectedTwist1}
                  onChange={e => i === 0 ? setSelectedSquat1(e.target.value) : i === 1 ? setSelectedPush1(e.target.value) : i === 2 ? setSelectedDeadlift1(e.target.value) : i === 3 ? setSelectedPull1(e.target.value) : i === 4 ? setSelectedLunge1(e.target.value) : setSelectedTwist1(e.target.value)}
                  className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a training</option>
                  {categorizedExercises[category.key].map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                  ))}
                </select>

                <select
                  value={i === 0 ? selectedSquat2 : i === 1 ? selectedPush2 : i === 2 ? selectedDeadlift2 : i === 3 ? selectedPull2 : i === 4 ? selectedLunge2 : selectedTwist2}
                  onChange={e => i === 0 ? setSelectedSquat2(e.target.value) : i === 1 ? setSelectedPush2(e.target.value) : i === 2 ? setSelectedDeadlift2(e.target.value) : i === 3 ? setSelectedPull2(e.target.value) : i === 4 ? setSelectedLunge2(e.target.value) : setSelectedTwist2(e.target.value)}
                  className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a training</option>
                  {categorizedExercises[category.key].map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
            {/* <label className="block text-gray-700">Squat House:</label>
            <div className="select-trainings">
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.squat && categorizedExercises.squat.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.squat && categorizedExercises.squat.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div>
             <label className="block text-gray-700">Push House:</label>
             <div className="select-trainings">
             <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.push && categorizedExercises.push.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.push && categorizedExercises.push.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div>
             <label className="block text-gray-700">Deadlift House:</label>
             <div className="select-trainings">
             <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.deadlift && categorizedExercises.deadlift.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.deadlift && categorizedExercises.deadlift.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div>
             <label className="block text-gray-700">Pull House:</label>
             <div className="select-trainings">
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.pull && categorizedExercises.pull.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.pull && categorizedExercises.pull.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div>
             <label className="block text-gray-700">Lunge House:</label>
             <div className="select-trainings">
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.lunge && categorizedExercises.lunge.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.lunge && categorizedExercises.lunge.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div>
             <label className="block text-gray-700">Twist House:</label>
             <div className="select-trainings">
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.twist && categorizedExercises.twist.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTraining}
                    onChange={handleSelectChange}
                    className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select a training</option>
                    {categorizedExercises.twist && categorizedExercises.twist.map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
             </div> */}


            
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

    // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    //   <form onSubmit={handleSubmit}>
    //     <div className="bg-white p-6 rounded-lg">
    //       <h2 className="text-xl font-semibold mb-4">Enter Guest Details</h2>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Name:</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onInput={(e) => setName(e.target.value)}
    //           required
    //           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Amount:</label>
    //         <input
    //           type="number"
    //           //value={amount}
    //           onInput={(e) => setAmount(e.target.value)}
    //           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Category:</label>
    //         <input
    //           type="text"
    //           //value={category}
    //           onInput={(e) => setCategory(e.target.value)}
    //           required
    //           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
    //         />
    //       </div>
    //       <div className="flex justify-end">
    //       <button
    //           type="submit"
    //           //className={styles.button}
    //         >
    //           Confirm
    //         </button>
    //         <button
    //           onClick={handleCancel}
    //           className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-200 rounded ml-9"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //       </div>
    //   </form>
    // </div>
}