const { useState } = React

export default function AddNote({ onAddNote }) {
    const [noteType, setNoteType] = useState('NoteTxt');
    const [noteContent, setNoteContent] = useState({ title: '', txt: '' })

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNoteContent((prevContent) => ({
            ...prevContent,
            [name]: value,
        }));
    }

    function handleNoteTypeChange(type) {
        setNoteType(type)
        setNoteContent({ title: '', txt: '', url: '', todos: [] })
    }

    function handleAddNote() {
        if (noteContent.title || noteContent.txt) {
            const newNote = {
                id: Math.random().toString(36).substr(2, 9),
                type: noteType,
                isPinned: false,
                createdAt: Date.now(),
                info: { ...noteContent },
                style: {
                    backgroundColor: '#fff',
                },
            };
            onAddNote(newNote);
            setNoteContent({ title: '', txt: '', url: '', todos: [] })
        }
    }

    return (
        <div className="add-note">
            <div className="add-note-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={noteContent.title}
                    onChange={handleInputChange}
                    className="note-title-input"
                />
                <textarea
                    name="txt"
                    placeholder="Take a note..."
                    value={noteContent.txt}
                    onChange={handleInputChange}
                    className="note-content-input"
                />
                <div className="note-type-icons">
                    <button onClick={() => handleNoteTypeChange('NoteTxt')}>
                        <i className="fas fa-font"></i>
                    </button>
                    <button onClick={() => handleNoteTypeChange('NoteImg')}>
                        <i className="fas fa-image"></i>
                    </button>
                    <button onClick={() => handleNoteTypeChange('NoteVideo')}>
                        <i className="fas fa-video"></i>
                    </button>
                    <button onClick={() => handleNoteTypeChange('NoteTodos')}>
                        <i className="fas fa-list"></i>
                    </button>
                    <button onClick={() => handleNoteTypeChange('NoteAudio')}>
                        <i className="fas fa-microphone"></i>
                    </button>
                    <button onClick={() => handleNoteTypeChange('NoteCanvas')}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>
                <button onClick={handleAddNote} className="add-note-button">
                    Add Note
                </button>
            </div>
        </div>
    )
}