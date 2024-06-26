import { useState, useEffect } from 'react';
import LoadTrainingForm from './LoadTrainingForm';
import CreateTrainingForm from './createTrainingForm';
import EditDeleteExerciseForm from './editDeleteExerciseForm'

export default function Sidebar({loadTrainingsOnTable, trainings, exercises}) {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const [LoadTrainingDialogOpen, setIsLoadTrainingDialogOpen] = useState(false);
    const [CreateTrainingDialogOpen, setIsCreateTrainingDialogOpen] = useState(false);
    const [EditDeleteExerciseDialogOpen, setIsEditDeleteExerciseDialogOpen] = useState(false);

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen)
    };

    useEffect(() => {
      console.log(exercises)
    }, [exercises])

    async function createTraining(trainingData) {
        try {
          const response = await fetch('/api/trainings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingData) // Convert trainingData to JSON string
          });
    
          if (!response.ok) {
            console.log(trainingData)
            throw new Error('Failed to create exercise');
          }
          setTrainings(prevTrainings => [...prevTrainings, trainingData]);
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error creating exercise:', error);
          throw error;
        }
      }

    return(
        <>
            <div className={`sidepanel ${!sidebarOpen ? 'w-0' : 'w-[20%] desktop:w-[11%] tv:w-[20%]'}`}>
                <button onClick={handleViewSidebar} className="sidepanel-close-button">&#215;</button>
                <button onClick={() => {
                  setSideBarOpen(false)
                  setIsLoadTrainingDialogOpen(true)}} className="sidepanel-button mt-2">Load Training</button>
                <button onClick={() => {
                  setSideBarOpen(false)
                  setIsCreateTrainingDialogOpen(true)}} className="sidepanel-button" >Create Training</button>
                <button onClick={() => {
                  setSideBarOpen(false)
                  setIsEditDeleteExerciseDialogOpen(true)}} className="sidepanel-button">Edit/Delete Exercise</button>
                <button className="sidepanel-button">Edit/Delete Training</button>
            </div>

            {!sidebarOpen &&
                <button onClick={handleViewSidebar}
                        className="hamburger">
                            &#9776;
                </button>}
                

            {LoadTrainingDialogOpen && <LoadTrainingForm
                onConfirm={loadTrainingsOnTable}
                onClose={() => setIsLoadTrainingDialogOpen(false)}
                trainings={trainings}
            />}

            {CreateTrainingDialogOpen && <CreateTrainingForm
                onConfirm={createTraining}
                onClose={() => setIsCreateTrainingDialogOpen(false)}
                trainings={trainings}
                fetched_exercises={exercises}
              />}
              
            {EditDeleteExerciseDialogOpen && <EditDeleteExerciseForm
              // onConfirm={createTraining}
              onClose={() => setIsEditDeleteExerciseDialogOpen(false)}
              trainings={trainings}
              fetched_exercises={exercises}
            />}
        </>
    )
}