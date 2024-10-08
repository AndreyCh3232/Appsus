const { Link } = ReactRouterDOM;

export function NoteList({ notes, onRemoveNote }) {

    function onEditNote(noteId) {
        console.log("on edit note", noteId);
    }

    return (
        <section>
            <ul className='note-list'>
                {notes.map(note => (
                    <li key={note.id}>
                        <div className="note-content">
                            {/* Render note image if URL exists */}
                            {note.info.url && (
                                <img src={note.info.url} alt="Note image" />
                            )}

                            {/* Render title if exists */}
                            {note.title && <h2>{note.title}</h2>}

                            {/* Render text content if exists */}
                            {note.txt && <h4>{note.txt}</h4>}
                            {note.info.txt && <span>{note.info.txt}</span>}

                            {/* Handle todos if present */}
                            {note.info.todos && (
                                <ul>
                                    {note.info.todos.map((todo, idx) => (
                                        <li key={idx}> <input type="checkbox" value={todo.txt}/> {todo.txt} </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="btn-actions">
                            <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                            <button onClick={() => onEditNote(note.id)}>Edit Note</button>
                            <button>Share</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
