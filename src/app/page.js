'use client'

import Image from 'next/image'
import logo from 'public/logo.png'
import Timer from '../components/timer'
import React from 'react';
import { useState, useRef } from 'react';

export default function Home() {
  const [editingNameIndex, setEditingNameIndex] = useState(null);
  const startEditingName = (index) => setEditingNameIndex(index)
  const stopEditingName = () =>  setEditingNameIndex(null)
  const editNameRef = useRef()

  const [tableData, setTableData] = useState([
    {excType: 'SQUAT(1)', bgColor: 'bg-gray-100', firstExc: 'סקוואט הטחות \u2190 קפיצה על תיבה', secondExc: 'בטן סטטית(הולו הולד) + ראשן טויסט', name1: '', name2: ''},
    {excType: 'PUSH(2)', bgColor: 'bg-pink-300', firstExc: 'לחיצות חזה + כפיפת ירך', secondExc: 'הפיכת צמיג', name1: '', name2: ''},
    {excType: 'DEADLIFT(3)', bgColor: 'bg-red-500', firstExc: 'דדליפט עם רגל אחת', secondExc: 'חבלי ניעור (באטל רופ)', name1: '', name2: ''},
    {excType: 'PULL(4)', bgColor: 'bg-blue-500', firstExc: 'HOIST מתח', secondExc: 'בטן כפיפת ירך בשכיבה(ידיות)', name1: '', name2: ''},
    {excType: 'LUNGE(5)', bgColor: 'bg-gray-300', firstExc: 'לאנג׳ \u2190 סקואט \u2190 לאנג׳', secondExc: 'פלאנק עליות על כפות ידיים', name1: '', name2: ''},
    {excType: 'TWIST(6)', bgColor: 'bg-yellow-300', firstExc: 'כפיפות צד', secondExc: 'חבל קפיצה על רגל אחת', name1: '', name2: ''}
  ])

  

  const updateTableData = (index) => {
    console.log(index)
    const newName = editNameRef.current.value
    console.log(newName)
    setTableData((prevData) => {
      const updatedData = [...prevData]
      updatedData[index].name1 = newName
      return updatedData
    })
    stopEditingName()
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      updateTableData(index);
    }
  }

  return(
      <div className="container mx-auto my-8 flex items-center">
        <Image src={logo} alt="logo"/>
        <table className="bg-white border border-gray-300 w-[1000px]">
          <thead>
            <tr>
              <th className="th">בית</th>
              <th className="th">האתגרים</th>
              <th className="th">אקטיביסטים</th>
            </tr>
          </thead>

          <tbody>
          {tableData.map((exercise, index) => (
            <React.Fragment key={index}>
              <tr key={index}>
                <td className={`excType ${exercise.bgColor}`} rowSpan={2}>
                  {exercise.excType}
                </td>
                <td className="firstExc">
                  {exercise.firstExc}
                </td>
                <td className="name cursor-pointer"
                  onClick={()=> startEditingName(index)}
                  onBlur={() => updateTableData(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                  {editingNameIndex === index ? (
                    <>
                    <input className="name" type="text" defaultValue={tableData[index].name1} ref={editNameRef} autoFocus />
                    </>
                ) : (
                  <>
                    {exercise.name1}
                  </>
                )}
                </td>
              </tr>
              <tr className="border-b">
                <td className="secondExc">{exercise.secondExc}</td>
                <td className="name cursor-pointer" onClick={() => startEditingName(index)}>
                  {exercise.name2}
                </td>
              </tr>
            </React.Fragment>
          ))}
          </tbody>
        </table>
        <div className="ml-5">
        <Timer />
        </div>
      </div>
    )
}
