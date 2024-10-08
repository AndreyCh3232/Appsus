// import NoteTxt from './NoteTypes/NoteTxt.jsx'
// import NoteImg from './NoteTypes/NoteImg.jsx'
// import NoteVideo from './NoteTypes/NoteVideo.jsx'
// import NoteTodos from './NoteTypes/NoteTodos.jsx'
// import NoteAudio from './NoteTypes/NoteAudio.jsx'
// import NoteCanvas from './NoteTypes/NoteCanvas.jsx'
// import NoteMap from './NoteTypes/NoteMap.jsx'

// const NOTE_COLORS = ['#fffa8b', '#9eff9d', '#b3e5fc', '#ffccf9', '#ffb74d', '#ffcdd2', '#e1bee7', '#c8e6c9', '#ffecb3']

// export default function NoteList({ notes, onDeleteNote, onUpdateNote, onDuplicateNote, onPinNote }) {
//     return (
//         <div className="note-list">
//             {notes.map((note) => (
//                 <NotePreview
//                     key={note.id}
//                     note={note}
//                     onDeleteNote={onDeleteNote}
//                     onUpdateNote={onUpdateNote}
//                     onDuplicateNote={onDuplicateNote}
//                     onPinNote={onPinNote}
//                 />
//             ))}
//         </div>
//     )
// }

// function NotePreview({ note, onDeleteNote, onUpdateNote, onDuplicateNote, onPinNote }) {
//     const { type, style = {}, isPinned, id } = note

//     const noteStyle = {
//         ...style,
//         backgroundColor: getRandomColor()
//     }

//     function getRandomColor() {
//         const randomIndex = Math.floor(Math.random() * NOTE_COLORS.length)
//         return NOTE_COLORS[randomIndex]
//     }

//     function getNoteComponent() {
//         switch (type) {
//             case 'NoteTxt':
//                 return <NoteTxt note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteImg':
//                 return <NoteImg note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteVideo':
//                 return <NoteVideo note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteTodos':
//                 return <NoteTodos note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteAudio':
//                 return <NoteAudio note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteCanvas':
//                 return <NoteCanvas note={note} onChangeInfo={onUpdateNote} />
//             case 'NoteMap':
//                 return <NoteMap note={note} onChangeInfo={onUpdateNote} />
//             default:
//                 return null
//         }
//     }

//     return (
//         <div className="note-preview" style={noteStyle}>
//             <div className="pin-note" onClick={() => onPinNote(id)}>{isPinned && '📌'}</div>
//             {getNoteComponent()}
//             <div className="note-actions">
//                 <button onClick={() => onDeleteNote(id)} className="delete-button"> Delete</button>
//                 <button onClick={() => onDuplicateNote(note)} className="duplicate-button"> Duplicate</button>
//             </div>
//         </div>
//     )
// }