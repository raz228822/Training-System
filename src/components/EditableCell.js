import React from 'react';

export default function EditableCell ({exercise, index, editingCell, startEditingCell, updateTableData, handleKeyDown, editNameRef, tableData, fieldName} ){
  const isEditing = editingCell && editingCell.index === index && editingCell.fieldName === fieldName;
  let cellClassName = ''
  let row_span = 1

  if (fieldName === 'firstExc') {
    cellClassName = 'firstExc';
  } else if (fieldName === 'secondExc') {
    cellClassName = 'secondExc';
  } else if (fieldName === 'excType') {
    cellClassName = `excType ${exercise.bgColor}`;
    row_span = 2
  }
    else {
    cellClassName = 'name';
  }

  return (
    <td
      className= {cellClassName}
      rowSpan = {row_span}
      onClick={() => startEditingCell(index, fieldName)}
      onBlur={() => updateTableData(index, fieldName)}
      onKeyDown={(event) => handleKeyDown(event, index, fieldName)}
    >
      {isEditing ? (
        <>
          <input
            className={cellClassName}
            rowSpan = {row_span}
            type="text"
            defaultValue={tableData[index][fieldName]}
            ref={editNameRef}
            autoFocus
          />
        </>
      ) : (
        <>
          {exercise[fieldName]}
        </>
      )}
    </td>
  );
};

