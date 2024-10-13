import { mailService } from '../services/mailService.js';

const { useParams, useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function MailDetails() {
    const { mailId } = useParams()
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId).then(setMail)
    }

    function handleDelete() {
        if (!mail) return

        const updatedMail = { ...mail, removedAt: Date.now() }
        mailService.update(updatedMail).then(() => {
            navigate('/mail')
        })
    }

    if (!mail) return <p>Loading...</p>

    return (
        <section className="mail-details">
            <header className="mail-header">
                <h2>{mail.subject}</h2>
                <div className="mail-actions">
                    <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
                    <div className="action-icons">
                        <button className="action-btn">
                            <i className="fas fa-reply"></i>
                        </button>
                        <button className="action-btn" onClick={handleDelete}>
                            <i className="fas fa-trash"></i> Delete
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-archive"></i>
                        </button>
                    </div>
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