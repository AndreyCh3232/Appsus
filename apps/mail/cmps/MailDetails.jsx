import { mailService } from '../services/mailService.js';

const { useParams } = ReactRouterDOM
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


    if (!mail) return <p>Loading...</p>

    return (
        <section className="mail-details">
            <header className="mail-header">
                <h2>{mail.subject}</h2>
                <div className="mail-actions">
                    <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
                </div>
            </header>
            <div className="mail-sender">
                <span>{mail.from}</span>
                <span>&lt;{mail.from}&gt;</span>
            </div>
            <div className="mail-body">
                <p>{mail.body}</p>
            </div>
        </section>
    )
}