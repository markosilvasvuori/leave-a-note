import { useContext } from 'react';

import { NoteContext } from '../store/note-context';
import Note from './Note';
import classes from './NoteList.module.css';

const NoteList = (props) => {
    const {notes, isLoading, error} = useContext(NoteContext);

    return (
        <ul className={classes["note-list"]}>
            {!notes && <p>Be the first one to leave a note!</p>}
            {isLoading && !error.isError && <p>Loading...</p>}
            {error.isError && <p>{error.errorMessage}</p>}
            {!isLoading && !error.isError && notes && Object.values(notes).reverse().map((note) => (
                <Note 
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    message={note.message}
                />
            ))}
        </ul>
    );
};

export default NoteList;