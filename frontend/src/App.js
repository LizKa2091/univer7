import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import OfflineStatus from './components/OfflineStatus';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const loadNotes = () => {
         try {
            const savedNotes = localStorage.getItem('notes');
            if (savedNotes) {
               const parsedNotes = JSON.parse(savedNotes);

               if (Array.isArray(parsedNotes) && parsedNotes.length > 0) {
                  setNotes(parsedNotes);
               }
            }
         } 
         catch (error) {
            console.error('Ошибка при загрузке заметок:', error);
         } 
         finally {
            setIsLoading(false);
         }
      };

      loadNotes();
   }, []);

   useEffect(() => {
      if (!isLoading) {
         localStorage.setItem('notes', JSON.stringify(notes));
      }
   }, [notes, isLoading]);

   const addNote = () => {
      if (newNote.trim() === '') return;
      
      const note = {
         id: Date.now(),
         text: newNote,
         createdAt: new Date().toISOString()
      };
      
      setNotes([...notes, note]);
      setNewNote('');
   };

   const deleteNote = (id) => {
      setNotes(notes.filter(note => note.id !== id));
   };

   const updateNote = (id, newText) => {
      setNotes(notes.map(note => 
         note.id === id ? { ...note, text: newText } : note
      ));
   };

   if (isLoading) {
      return <div className="app">Загрузка...</div>;
   }

   return (
      <div className="app">
         <h1>Мои Заметки</h1>
         <OfflineStatus />
         <div className="note-form">
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Введите текст заметки..." />
            <button onClick={addNote}>Добавить</button>
         </div>
         <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
      </div>
   );
};

export default App;