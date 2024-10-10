import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.services.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function EditNote() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNoteForEdit())
    const navigate = useNavigate()
    const params = useParams()

    console.log(params)


    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        let value = target.value
        let field = target.id
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then((savedNote) => {
                navigate('/note')
                showSuccessMsg(`New note created ${savedNote.id}`)
            })
            .catch(err => {
                showErrorMsg('Cannot save note')
                console.log('err:', err)
            })
    }

    const { title } = { noteToEdit }

    return <section className="add-note-container">
                <form onSubmit={onSaveNote}>
                    <input onChange={handleChange} type="text" value={title} name="title" id="title" placeholder="Title" className="note-title-input" />
                    <input onChange={handleChange} type="text" name="note" id="note" className="note-content-input" placeholder="Take a note..." />
                     <div className="note-type-icons">
                       <button className="add-note-button">Save </button>
                     </div>
                </form>
          </section>


}