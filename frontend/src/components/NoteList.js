import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDelete, onUpdate }) => {
   return (
      <div className="note-list">
         {notes.length === 0 ? (
            <p>Нет заметок. Добавьте первую!</p>
         ) : (
            notes.map((note) => (
               <Note key={note.id} note={note} onDelete={onDelete} onUpdate={onUpdate}
               />
            ))
         )}
      </div>
   );
};

export default NoteList;