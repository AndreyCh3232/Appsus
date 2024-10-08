
export default function NoteMap({ note, onChangeInfo }) {
    const { info } = note

    return (
        <div className="note-map">
            <iframe
                width="100%"
                height="200"
                src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNHUObdNCF7VFIMkhY59IrcwBqMwetx64&loading=async&libraries=maps,marker&v=beta`}
                allowFullScreen
                loading="lazy"
                title="Location Map"
            ></iframe>
            <p>{info.title}</p>
        </div>
    )
}