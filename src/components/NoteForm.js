import { useState, useContext } from 'react';

import { NoteContext } from '../store/note-context';
import classes from './NoteForm.module.css';

const NoteForm = (props) => {
    const {submitNotesHandler} = useContext(NoteContext);
    const uniqueID = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const [note, setNote] = useState({
        id: uniqueID,
        title: '',
        message: ''
    });
    const [error, setEerror] = useState(false);

    const onChangeTitleHandler = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            title: event.target.value
        }));
    };

    const onChangeMessageHandler = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            message: event.target.value
        }));
    };

    const validateForm = (event) => {
        event.preventDefault();
        if (note.title.trim() !== '' && note.message.trim() !== '') {
            submitNote();
            setEerror(false);
        } else {
            setEerror(true);
        }
    };

    const submitNote = () => {
        submitNotesHandler(note);
        setNote({
            id: uniqueID,
            title: '',
            message: ''
        });
    };

    return (
        <form className={classes.form} onSubmit={validateForm}>
            <input 
                className={error && note.title === '' ? classes.error : ''} 
                name="title" 
                value={note.title} 
                onChange={onChangeTitleHandler}
                placeholder={"Title"}
            />
            <input 
                className={error && note.message === '' ? classes.error : ''} 
                name="message" 
                value={note.message} 
                onChange={onChangeMessageHandler} 
                placeholder={"Message..."}
            />
            <div>
                {error && 
                    <div className={classes["error-message"]}>
                        Please enter all fields!
                    </div>
                }
                <button>Leave a note</button>
            </div>
        </form>
    );
};

export default NoteForm;