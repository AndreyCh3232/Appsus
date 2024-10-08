import { noteService } from '../../note/services/note.services.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { EditNote } from './EditNote.jsx'
const { Link, useSearchParams } = ReactRouterDOM

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = noteService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)


    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load notes')
            })
    }, [])

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg('Note removed!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg("Can not remove note", noteId)
            })
    }

    var note = noteService.createNote('new title')
    console.log("Created new note using func",note)
    

    if (!notes) return <div>Loading...</div>

    return <section>
            <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>
            <Link to="/note/edit"> Add Note</Link>
    </section>
}