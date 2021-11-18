import { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([]);
    const [canFetchNotes, setCanFetchNotes] = useState(true);
    const url = 'https://react-leave-a-note-default-rtdb.europe-west1.firebasedatabase.app/notes.json';

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCanFetchNotes(true);
        }, 5000);

        if (canFetchNotes) {
            const fetchNotes = async () => {
                const response = await fetch(url);
                const data = await response.json();
                setNotes(data);
            };
            fetchNotes();
            setCanFetchNotes(false);
        }

        return () => clearInterval(intervalID);
    }, [canFetchNotes]);

    const submitNotesHandler = async (note) => {   
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        });
        setCanFetchNotes(true);
    };

    return (
        <NoteContext.Provider value={{notes, setNotes, submitNotesHandler}}>
            {props.children}
        </NoteContext.Provider>
    );
};