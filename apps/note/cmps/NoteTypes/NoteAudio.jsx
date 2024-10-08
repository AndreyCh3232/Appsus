
export default function NoteAudio({ note, onChangeInfo }) {
    const { info } = note

    return (
        <div className="note-audio">
            <audio controls>
                <source src={info.url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <p>{info.title}</p>
        </div>
    )
}