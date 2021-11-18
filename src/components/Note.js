import classes from './Note.module.css';

const Note = (props) => {
    return (
        <li className={classes.note}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </li>
    );
};

export default Note;