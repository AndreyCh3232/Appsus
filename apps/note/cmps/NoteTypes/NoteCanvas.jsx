const { useRef, useEffect } = React

export default function NoteCanvas({ note, onChangeInfo }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'lightgray'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    return (
        <div className="note-canvas">
            <canvas ref={canvasRef} width="200" height="200"></canvas>
            <p>{note.info.title}</p>
        </div>
    )
}