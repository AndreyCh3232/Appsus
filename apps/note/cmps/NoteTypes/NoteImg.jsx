
export default function NoteImg({ note, onChangeInfo }) {
    const { info } = note

    return (
        <div className="note-img">
            <img src={info.url} alt={info.title} />
            <p>{info.title}</p>
        </div>
    )
}