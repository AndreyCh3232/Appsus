import { useParams } from 'react-router-dom';
import { mailService } from '../services/mailService';

const { useEffect, useState } = React

export function MailDetails() {
    const { mailId } = useParams()
    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId).then(setMail)
    }

    function saveAsNote() {
        const { subject, body } = mail;
        const queryParams = new URLSearchParams({ title: subject, content: body }).toString()
        window.location.href = `/note/edit?${queryParams}`
    }

    if (!mail) return <p>Loading...</p>

    return (
        <section className="mail-details">
            <h2>{mail.subject}</h2>
            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>
            <p>{mail.body}</p>
            <button onClick={saveAsNote} className="save-as-note-btn">
                Save as Note
            </button>
        </section>
    )
}