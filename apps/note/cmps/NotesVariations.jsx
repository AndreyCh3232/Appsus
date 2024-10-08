import { NoteInput } from './NoteInput';

export function NotesVariations() {
    return (
        <section className="notes-variations">
            <h3>Some notes variations:</h3>
            <NoteInput
                placeholder="Enter image URL..."
                icons={['fa-font', 'fa-image', 'fa-video', 'fa-microphone', 'fa-list']}
            />
            <NoteInput
                placeholder="Enter video URL..."
                icons={['fa-font', 'fa-image', 'fa-video', 'fa-microphone', 'fa-list']}
            />
            <NoteInput
                placeholder="Enter comma separated list..."
                icons={['fa-font', 'fa-image', 'fa-video', 'fa-microphone', 'fa-list']}
            />
        </section>
    )
}