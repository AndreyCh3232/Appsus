import { noteService } from "../services/note.services.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function EditNote() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if ('') loadNote()
    }, [])

    function handleChange({ target }) {
        let value = target.value
        let field = target.id
        console.log(target)

        // switch (field) {
        //     case 'title':
        //         newNote.field = value
        //         break;
        //     case 'note':
        //         newNote.field = value
        //         break;
        // }
      const note =  setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
      console.log('New note obg is:',note);
      
    }

    function onSaveNote(value) {
    }


    return <div>
        <h1>Edit page</h1>
        <form onSubmit={onSaveNote}>
            <input onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />
            <input onChange={handleChange} type="text" name="note" id="note" placeholder="Take a note..." />
            <button>Save</button>
        </form>
    </div>
}