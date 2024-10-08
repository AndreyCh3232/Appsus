import { Link } from 'react-router-dom'

export default function MailPreview({ mail }) {
    return (
        <Link to={`/mail/${mail.id}`} className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <h3>{mail.subject}</h3>
            <p>{mail.body.substring(0, 50)}...</p>
            <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
        </Link>
    )
}