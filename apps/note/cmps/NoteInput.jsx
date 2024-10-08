export function NoteInput({ placeholder, icons }) {
    return (
        <div className="note-input-container">
            <input type="text" placeholder={placeholder} className="note-input" />
            <div className="note-icons">
                {icons.map((icon, index) => (
                    <i key={index} className={`fas ${icon}`}></i>
                ))}
            </div>
        </div>
    )
}