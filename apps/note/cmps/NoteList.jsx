const { Link } = ReactRouterDOM;
import {NotePreview} from './NotePreview.jsx'
export function NoteList({ notes, onRemoveNote }) {

    return (
        <ul className="note-list flex">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview note={note}/>
                    <div className="btn-actions flex">
                        <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                        <button onClick={() => onEditNote(note.id)}>
                            <Link to={`/note/edit/${note.id}`}> Edit Note</Link>
                        </button>
                        <button>Share</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
