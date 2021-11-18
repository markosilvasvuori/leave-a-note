import { NoteProvider } from './store/note-context';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  return (
    <NoteProvider>
      <NoteForm />
      <NoteList />
    </NoteProvider>
  );
}

export default App;
