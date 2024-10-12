
export default function MailPreview({ mail, onStar, onMailSelect, isSelected }) {
    function handleStarClick(event) {
        event.preventDefault()
        event.stopPropagation()
        onStar(mail.id)
    }
    function handleMailClick() {
        onMailSelect(mail.id)
    }


    return (
        <div onClick={handleMailClick} style={{ cursor: 'pointer' }}>
            <div className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}>
                <h3>{mail.subject}</h3>
                <p>{mail.body.substring(0, 50)}...</p>
                <span>{new Date(mail.createdAt).toLocaleDateString()}</span>
                <button onClick={handleStarClick} className="star-btn">
                    {mail.isStared ? '⭐' : '☆'}
                </button>
            </div>
            {isSelected && (
                <div className="mail-details">
                    <h4>{mail.subject}</h4>
                    <p><strong>From:</strong> {mail.from}</p>
                    <p><strong>To:</strong> {mail.to}</p>
                    <p>{mail.body}</p>
                    <p><strong>Date:</strong> {new Date(mail.createdAt).toLocaleString()}</p>
                </div>

            )
            }
        </div >
    )
}