import MailPreview from './MailPreview.jsx';

const { useState } = React

export default function MailList({ mails, onStar }) {
    const [selectedMailId, setSelectedMailId] = useState(null)

    function handleMailSelect(mailId) {
        setSelectedMailId(prevId => (prevId === mailId ? null : mailId));
    }

    if (!mails.length) {
        return <p>No mails to show.</p>
    }

    return (
        <div className="mail-list">
            {mails.map((mail) => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onStar={onStar}
                    onMailSelect={handleMailSelect}
                    isSelected={mail.id === selectedMailId}
                />
            ))}
        </div>
    )
}
