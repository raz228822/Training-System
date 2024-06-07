import { useState, useEffect } from 'react';

export default function LoadTrainingForm({onConfirm, onClose, trainings }) {
  const [selectedTraining, setSelectedTraining] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    // try {
    //   const selected = trainings.find((training) => training.training === selectedTraining);
    //   if (selected) {
    //     onConfirm(selected); // Call the loadTrainingOnTable function with the selected training
    //     onClose();
    //   }
    // } catch (error) {
    //   console.error('Error loading training:', error);
    // }
  };
  
  const handleSelectChange = (e) => {
    setSelectedTraining(e.target.value);
  };

  useEffect(() => {
    try {
    const selected = trainings.find((training) => training.training === selectedTraining);
      if (selected) {
        onConfirm(selected);
      }
      else {
        onConfirm(NULL)
      }
    } catch (error) {
      console.error('Error loading training:', error);
    }
  }, [selectedTraining]); // Run this effect whenever 'trainings' state changes

  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex justify-center">Load Training</h2>
            <select
                value={selectedTraining}
                onChange={handleSelectChange}
                className="mb-4 w-72 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
                <option value="">Select a training</option>
                {trainings.map((training, index) => (
                <option key={index} value={training.training}>{training.training}</option>
                ))}
            </select>
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