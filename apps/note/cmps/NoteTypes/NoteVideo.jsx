
export default function NoteVideo({ note, onChangeInfo }) {
    const { info } = note

    return (
        <div className="note-video">
            <video controls>
                <source src={info.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{info.title}</p>
        </div>
    )
}