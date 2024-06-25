import { useState, useEffect } from 'react';

export default function LoadTrainingForm({onConfirm, onClose, trainings }) {
  const [selectedTraining, setSelectedTraining] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selected = trainings.find((training) => training.name === selectedTraining);
        if (selected) {
          onConfirm(selected);
        }
      } catch (error) {
        console.error('Error loading training:', error);
      }
    onClose();
  };
  
  const handleSelectChange = (e) => {
    setSelectedTraining(e.target.value);
  };

  const handleCancel = () => {
    // Call the onCancel callback
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 tv:p-12 rounded-lg">
          <h2 className="text-2xl tv:text-5xl font-semibold mb-4 flex justify-center">Load Training</h2>
            <select
                value={selectedTraining}
                onChange={handleSelectChange}
                className="tv:text-4xl mb-4 tv:my-8 w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
                <option value="">Select a training</option>
                {trainings.map((training, index) => (
                <option key={index} value={training.name}>{training.name}</option>
                ))}
            </select>
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