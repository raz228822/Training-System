import { useState, useEffect } from 'react';

export default function AddTrainingForm({onConfirm, onClose, exercises }) {
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
  console.log(exercises)

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
    // // Call the function to add exercise and pass the exercise name
    onConfirm({'training': trainingName,
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

            {exerciseCategories.slice(0,6).map((category, i) => (
            <div key={i}>
              <label className="block text-gray-700">{category.name}:</label>
              <div className="select-trainings">
                <select
                  value={i === 0 ? selectedSquat : i === 1 ? selectedPush : i === 2 ? selectedDeadlift : i === 3 ? selectedPull : i === 4 ? selectedLunge : selectedTwist}
                  onChange={e => i === 0 ? setSelectedSquat(e.target.value) : i === 1 ? setSelectedPush(e.target.value) : i === 2 ? setSelectedDeadlift(e.target.value) : i === 3 ? setSelectedPull(e.target.value) : i === 4 ? setSelectedLunge(e.target.value) : setSelectedTwist(e.target.value)}
                  className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select an exercise</option>
                  {categorizedExercises[category.key].map((exercise, index) => (
                    <option key={index} value={exercise.name}>{exercise.name}</option>
                  ))}
                </select>

                <select
                  value={i === 0 ? selectedSquatAerobicAbs : i === 1 ? selectedPushAerobicAbs : i === 2 ? selectedDeadliftAerobicAbs : i === 3 ? selectedPullAerobicAbs : i === 4 ? selectedLungeAerobicAbs : selectedTwistAerobicAbs}
                  onChange={e => i === 0 ? setSelectedSquatAerobicAbs(e.target.value) : i === 1 ? setSelectedPushAerobicAbs(e.target.value) : i === 2 ? setSelectedDeadliftAerobicAbs(e.target.value) : i === 3 ? setSelectedPullAerobicAbs(e.target.value) : i === 4 ? setSelectedLungeAerobicAbs(e.target.value) : setSelectedTwistAerobicAbs(e.target.value)}
                  className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select an exercise</option>
                  {categorizedExercises['aerobic_abs'].map((exercise, index) => (
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