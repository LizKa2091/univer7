import React, { useState } from 'react';

const Note = ({ note, onDelete, onUpdate }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedText, setEditedText] = useState(note.text);

   const handleUpdate = () => {
      onUpdate(note.id, editedText);
      setIsEditing(false);
   };

   return (
      <div className="note">
         {isEditing ? (
            <>
               <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
               <button onClick={handleUpdate}>Сохранить</button>
               <button onClick={() => setIsEditing(false)}>Отмена</button>
            </>
         ) : (
            <>
               <p>{note.text}</p>
               <div className="note-actions">
                  <button onClick={() => setIsEditing(true)}>Редактировать</button>
                  <button onClick={() => onDelete(note.id)}>Удалить</button>
               </div>
            </>
         )}
      </div>
   );
};

export default Note;