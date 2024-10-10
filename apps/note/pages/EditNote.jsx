import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.services.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function EditNote() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNoteForEdit())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const { name, value } = target;  // Use `name` instead of `id` for simplicity

        // Update state based on which field changed
        if (name === 'title') {
            setNoteToEdit(prevNote => ({ ...prevNote, title: value }));
        } else if (name === 'txt') {
            setNoteToEdit(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, txt: value }  // Update only the `txt` property inside `info`
            }));
        }
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
    const { title, info: { txt = '' } = {} } = noteToEdit


    return <section className="note-editor">
    <div className="note-editor-container">
      <form onSubmit={onSaveNote} className="note-form">
        <input 
          onChange={handleChange} 
          type="text" 
          value={title} 
          name="title" 
          id="title" 
          placeholder="Title" 
          className="note-input note-title" 
        />
        <input 
          onChange={handleChange} 
          type="text" 
          value={txt} 
          name="txt" 
          id="txt" 
          placeholder="Take a note..." 
          className="note-input note-text" 
        />
        <button className="save">Save</button>
        <div className="note-icons">
          <span className="material-icons">image</span>
          <span className="material-icons">brush</span>
        </div>
  
        <div className="note-footer">
          <div className="note-footer-icons">
            <span className="material-icons">notifications</span>
            <span className="material-icons">share</span>
            <span className="material-icons">palette</span>
            <span className="material-icons">image</span>
            <span className="material-icons">more_vert</span>
            <span className="material-icons">undo</span>
            <span className="material-icons">redo</span>
          </div>
        </div>
      </form>
    </div>
  </section>
  
}
