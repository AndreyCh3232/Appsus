import { noteService } from '../services/noteService.js'
import NoteList from '../cmps/NoteList.jsx'
import AddNote from '../cmps/AddNote.jsx'
import { NoteInput } from '../cmps/NoteInput.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ search: '', type: '' })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        setIsLoading(true)
        noteService.query(filterBy).then((loadedNotes) => {
            setNotes(loadedNotes)
            setIsLoading(false)
        })
    }

    function onAddNote(note) {
        setIsLoading(true)
        noteService.add(note).then(() => {
            setNotes((prevNotes) => [note, ...prevNotes])
            setIsLoading(false)
        })
    }

    function onDeleteNote(noteId) {
        setIsLoading(true)
        noteService.remove(noteId).then(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
            setIsLoading(false)
        })
    }

    function onUpdateNote(updatedNote) {
        setIsLoading(true)
        noteService.update(updatedNote).then(() => {
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
            )
            setIsLoading(false)
        })
    }

    function onDuplicateNote(note) {
        const duplicatedNote = {
            ...note,
            id: noteService.makeId(),
            createdAt: Date.now(),
            isPinned: false,
        }
        setIsLoading(true)
        noteService.add(duplicatedNote).then(() => {
            setNotes((prevNotes) => [duplicatedNote, ...prevNotes])
            setIsLoading(false)
        })
    }

    function onPinNote(noteId) {
        const noteToPin = notes.find((note) => note.id === noteId)
        if (noteToPin) {
            const updatedNote = { ...noteToPin, isPinned: !noteToPin.isPinned }
            setIsLoading(true)
            noteService.update(updatedNote).then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
                )
                setIsLoading(false)
            })
        }
    }
    function handleFilterChange(event) {
        const { value } = event.target
        setFilterBy((prevFilter) => ({ ...prevFilter, search: value }))
    }

    return (
        <div className="note-index">
            <h1>MissKeep App</h1>
            <NoteInput
                placeholder="Search notes..."
                icons={['fa-font', 'fa-image', 'fa-video', 'fa-microphone', 'fa-list']}
                onChange={handleFilterChange}
            />
            <div className="notes-container" >
                {isLoading ? (
                    <p>Loading notes...</p>
                ) : (
                    <NoteList
                        notes={notes}
                        onDeleteNote={onDeleteNote}
                        onUpdateNote={onUpdateNote}
                        onDuplicateNote={onDuplicateNote}
                        onPinNote={onPinNote}
                    />
                )}
            </div>
            <AddNote onAddNote={onAddNote} />
        </div>
    )
}