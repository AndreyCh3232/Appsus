
export default function NoteTxt({ note, onChangeInfo }) {
    const { info } = note

    function handleChange(event) {
        onChangeInfo({ ...info, txt: event.target.value })
    }

    return (
        <div className=" note note-txt">
            <textarea
                value={info.txt}
                onChange={handleChange}
                placeholder="Write something..."
            />
        </div>
    )
}