import MailPreview from './MailPreview.jsx';

export default function MailList({ mails, onStar }) {
    if (!mails.length) {
        return <p>No mails to show.</p>
    }

    return (
        <div className="mail-list">
            {mails.map((mail) => (
                <MailPreview key={mail.id} mail={mail} onStar={onStar} />
            ))}
        </div>
    )
}
