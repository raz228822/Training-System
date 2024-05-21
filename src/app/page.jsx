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

  const startEditingCell = (index, fieldName) => {
    setEditingCell({ index, fieldName })
  }
  
  const stopEditingCell = () =>  setEditingCell(null)

  const [tableData, setTableData] = useState([
    {excType: 'SQUAT(1)', bgColor: 'bg-gray-100', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'PUSH(2)', bgColor: 'bg-red-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'DEADLIFT(3)', bgColor: 'bg-blue-500', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'PULL(4)', bgColor: 'bg-gray-300', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'LUNGE(5)', bgColor: 'bg-yellow-300', firstExc: '', secondExc: '', name1: '', name2: ''},
    {excType: 'TWIST(6)', bgColor: 'bg-gray-100', firstExc: '', secondExc: '', name1: '', name2: ''},

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

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('/api/trainings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to load training');
        }

        const data = await response.json();
        setTrainings(data); // Directly set the array of training objects

      } catch (error) {
        console.error('Error loading training:', error);
      }
    };

    fetchTrainings();
  }, []);

  // useEffect(() => {
  //   //loadTrainingFromDB();
  //   console.log(trainings);
  // }, [trainings]); // Run this effect whenever 'trainings' state changes

  const loadTrainingOnTable = (training) => {
    // Map through the table data and update the corresponding fields with the text from the training object
    const updatedTableData = tableData.map((exercise, index) => {
      switch (index) {
        case 0: // Update the first exercise type
          return { ...exercise, firstExc: training.exercise_1, secondExc: training.exercise_2 };
        case 1: // Update the second exercise type
          return { ...exercise, firstExc: training.exercise_3, secondExc: training.exercise_4 };
        case 2: // Update the second exercise type
          return { ...exercise, firstExc: training.exercise_5, secondExc: training.exercise_6 };
        case 3: // Update the second exercise type
          return { ...exercise, firstExc: training.exercise_7, secondExc: training.exercise_8 };
        case 4: // Update the second exercise type
          return { ...exercise, firstExc: training.exercise_9, secondExc: training.exercise_10 };
        case 5: // Update the second exercise type
          return { ...exercise, firstExc: training.exercise_11, secondExc: training.exercise_12 };
      }
    });
    // Update the table data with the modified array
    setTableData(updatedTableData);
  }

  return(
      <div className="my-8 flex items-center">
        <Image src={logo} alt="logo" width={300}/>
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
          <Timer switchNames={switchNames} loadTrainingsOnTable={loadTrainingOnTable} trainings={trainings}/>
        </div>
      </div>
    )
}
