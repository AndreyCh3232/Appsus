export function NotePreview({ note }) {

    return <article>  {
        note.info.url && (
            <img src={note.info.url} alt="Note image" />
        )
    }
        {note.title && <h2>{note.title}</h2>}

        {note.txt && <h4>{note.txt}</h4>}
        {note.info.txt && <span>{note.info.txt}</span>}

        {
            note.info.todos && (
                <ul>
                    {note.info.todos.map((todo, idx) => (
                        <li key={idx}> <input type="checkbox" value={todo.txt} /> {todo.txt} </li>
                    ))}
                </ul>
            )
        }</article>
}