'use client'

import Image from 'next/image'
import logo from 'public/logo.png'
import Timer from '../components/timer'
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import EditableCell from '../components/EditableCell'


export default function Home() {
  const [editingCell, setEditingCell] = useState(null)
  const editNameRef = useRef()
  const [trainings, setTrainings] = useState([]);
  const [exercises, setExercises] = useState([]);

  const startEditingCell = (index, fieldName) => {
    setEditingCell({ index, fieldName })
  }
  
  const stopEditingCell = () =>  setEditingCell(null)

  const [tableData, setTableData] = useState([
    {excType: 'SQUAT(1)', bgColor: 'bg-yellow-400', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'PUSH(2)', bgColor: 'bg-pink-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'DEADLIFT(3)', bgColor: 'bg-red-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'PULL(4)', bgColor: 'bg-blue-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'LUNGE(5)', bgColor: 'bg-gray-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'TWIST(6)', bgColor: 'bg-white', firstExc: '', secondExc: '', name1: '', name2: ''},

    //{excType: 'SQUAT(1)', bgColor: 'bg-gray-100', firstExc: 'סקוואט הטחות \u2190 קפיצה על תיבה', secondExc: 'בטן סטטית(הולו הולד) + ראשן טויסט', name1: '', name2: ''},
    // {excType: 'PUSH(2)', bgColor: 'bg-pink-300', firstExc: 'לחיצות חזה + כפיפת ירך', secondExc: 'הפיכת צמיג', name1: '', name2: ''},
    // {excType: 'DEADLIFT(3)', bgColor: 'bg-red-500', firstExc: 'דדליפט עם רגל אחת', secondExc: 'חבלי ניעור (באטל רופ)', name1: '', name2: ''},
    // {excType: 'PULL(4)', bgColor: 'bg-blue-500', firstExc: 'HOIST מתח', secondExc: 'בטן כפיפת ירך בשכיבה(ידיות)', name1: '', name2: ''},
    // {excType: 'LUNGE(5)', bgColor: 'bg-gray-300', firstExc: 'לאנג׳ \u2190 סקואט \u2190 לאנג׳', secondExc: 'פלאנק עליות על כפות ידיים', name1: '', name2: ''},
    // {excType: 'TWIST(6)', bgColor: 'bg-yellow-300', firstExc: 'כפיפות צד', secondExc: 'חבל קפיצה על רגל אחת', name1: '', name2: ''}
  ])

  const updateTableData = (index, fieldName) => {
    const newData = editNameRef.current.value;
    setTableData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][fieldName] = newData;
      return updatedData;
    });
    stopEditingCell();
  };

  const handleKeyDown = (event, index, fieldName) => {
    if (event.key === 'Enter') {
      updateTableData(index, fieldName);
    }
  }

  const switchNames = () => {
    tableData.map((exercise, index) => {
      const temp = tableData[index].name1;
      tableData[index].name1 = tableData[index].name2;
      tableData[index].name2 = temp;
    })
    setTableData([...tableData]); // Trigger re-render
  };

  const fetchData = async () => {
    try {
      const trainingResponse = await fetch('/api/trainings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (trainingResponse.status !== 200) {
        throw new Error('Failed to load training');
      }

      const trainingData = await trainingResponse.json();
      setTrainings(trainingData);

      const exerciseResponse = await fetch('/api/exercises', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (exerciseResponse.status !== 200) {
        throw new Error('Failed to load exercises');
      }

      const exerciseData = await exerciseResponse.json();
      setExercises(exerciseData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This useEffect will trigger once on component mount
  

  // useEffect(() => {
  //   //loadTrainingFromDB();
  //   console.log(trainings);
  // }, [trainings]); // Run this effect whenever 'trainings' state changes

  const loadTrainingOnTable = (training) => {
    console.log(training)
    // Map through the table data and update the corresponding fields with the text from the training object
    const updatedTableData = tableData.map((exercise, index) => {

      switch (index) {
        case 0:
          return { ...exercise, firstExc: training.squat, secondExc: training.squat_aerobic_abs };
        case 1:
          return { ...exercise, firstExc: training.push, secondExc: training.push_aerobic_abs };
        case 2: 
          return { ...exercise, firstExc: training.deadlift, secondExc: training.deadlift_aerobic_abs };
        case 3:
          return { ...exercise, firstExc: training.pull, secondExc: training.pull_aerobic_abs };
        case 4: 
          return { ...exercise, firstExc: training.lunge, secondExc: training.lunge_aerobic_abs };
        case 5:
          return { ...exercise, firstExc: training.twist, secondExc: training.twist_aerobic_abs };
      }
    });
    // Update the table data with the modified array
    setTableData(updatedTableData);
  }

  return(
      <div className="my-8 flex items-center">
        <Image src={logo} alt="logo"className="laptop:w-[100px] desktop:w-[300px]"/>
        <div className="w-[55%]">
          <table className="bg-white border border-gray-300 tv:h-[97vh] laptop:h-[90vh] desktop:h-[95vh] w-full">
            <thead>
              <tr>
                <th className="th w-[22%]">בית</th>
                <th className="th w-[60%]">האתגרים</th>
                <th className="th w-[18%]">אקטיביסטים</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((exercise, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <EditableCell
                    key={index + "excType"}
                    exercise={exercise}
                    index={index}
                    editingCell={editingCell}
                    startEditingCell={startEditingCell}
                    updateTableData={updateTableData}
                    handleKeyDown={handleKeyDown}
                    editNameRef={editNameRef}
                    tableData={tableData}
                    fieldName={'excType'}
                    />

                    <EditableCell
                    key={index + "firstExc"}
                    exercise={exercise}
                    index={index}
                    editingCell={editingCell}
                    startEditingCell={startEditingCell}
                    updateTableData={updateTableData}
                    handleKeyDown={handleKeyDown}
                    editNameRef={editNameRef}
                    tableData={tableData}
                    fieldName={'firstExc'}
                    />

                    <EditableCell
                    key={index + "name1"}
                    exercise={exercise}
                    index={index}
                    editingCell={editingCell}
                    startEditingCell={startEditingCell}
                    updateTableData={updateTableData}
                    handleKeyDown={handleKeyDown}
                    editNameRef={editNameRef}
                    tableData={tableData}
                    fieldName={'name1'}
                    />
                  </tr>

                <tr className="border-b-2">
                  <EditableCell
                    key={index + "secondExc"}
                    exercise={exercise}
                    index={index}
                    editingCell={editingCell}
                    startEditingCell={startEditingCell}
                    updateTableData={updateTableData}
                    handleKeyDown={handleKeyDown}
                    editNameRef={editNameRef}
                    tableData={tableData}
                    fieldName={'secondExc'}
                  />
                  
                  <EditableCell
                    key={index + "name2"}
                    exercise={exercise}
                    index={index}
                    editingCell={editingCell}
                    startEditingCell={startEditingCell}
                    updateTableData={updateTableData}
                    handleKeyDown={handleKeyDown}
                    editNameRef={editNameRef}
                    tableData={tableData}
                    fieldName={'name2'}
                    />
                    
                  </tr>
                  </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[45%]">
          <Timer switchNames={switchNames} loadTrainingsOnTable={loadTrainingOnTable} trainings={trainings} exercises={exercises} fetchData={fetchData}/>
        </div>
      </div>
    )
}
