'use client'

import Image from 'next/image'
import logo from 'public/logo.png'
import Timer from '../components/timer'
import React from 'react';
import { useState, useRef } from 'react';
import EditableCell from '../components/EditableCell'



export default function Home() {
  const [editingCell, setEditingCell] = useState(null)
  const editNameRef = useRef()

  const startEditingCell = (index, fieldName) => {
    setEditingCell({ index, fieldName })
  }
  
  const stopEditingCell = () =>  setEditingCell(null)

  const [tableData, setTableData] = useState([
    {excType: 'SQUAT(1)', bgColor: 'bg-gray-100', firstExc: 'סקוואט הטחות \u2190 קפיצה על תיבה', secondExc: 'בטן סטטית(הולו הולד) + ראשן טויסט', name1: '', name2: ''},
    {excType: 'PUSH(2)', bgColor: 'bg-pink-300', firstExc: 'לחיצות חזה + כפיפת ירך', secondExc: 'הפיכת צמיג', name1: '', name2: ''},
    {excType: 'DEADLIFT(3)', bgColor: 'bg-red-500', firstExc: 'דדליפט עם רגל אחת', secondExc: 'חבלי ניעור (באטל רופ)', name1: '', name2: ''},
    {excType: 'PULL(4)', bgColor: 'bg-blue-500', firstExc: 'HOIST מתח', secondExc: 'בטן כפיפת ירך בשכיבה(ידיות)', name1: '', name2: ''},
    {excType: 'LUNGE(5)', bgColor: 'bg-gray-300', firstExc: 'לאנג׳ \u2190 סקואט \u2190 לאנג׳', secondExc: 'פלאנק עליות על כפות ידיים', name1: '', name2: ''},
    {excType: 'TWIST(6)', bgColor: 'bg-yellow-300', firstExc: 'כפיפות צד', secondExc: 'חבל קפיצה על רגל אחת', name1: '', name2: ''}
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

  return(
      <div className="my-8 flex items-center">
        <Image src={logo} alt="logo"/>
        <div className="w-1/2">
          <table className="bg-white border border-gray-300 laptop:h-[90vh] desktop:h-[92vh] w-full">
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
                  <tr className="h-22">

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

                <tr className="border-b">
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
        <div className="w-1/2">
          <Timer />
        </div>
      </div>
    )
}
