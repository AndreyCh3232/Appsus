const { Link } = ReactRouterDOM


export default function MailPreview({ mail, onStar }) {
    function handleStarClick(event) {
        event.preventDefault()
        onStar(mail.id)
    }

    return (
        <div className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
            <Link to={`/mail/${mail.id}`}>
                <h3>{mail.subject}</h3>
                <p>{mail.body.substring(0, 50)}...</p>
                <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
            </Link>
            <button onClick={handleStarClick} className="star-btn">
                {mail.isStared ? '⭐' : '☆'}
            </button>
        </div>
    )
}