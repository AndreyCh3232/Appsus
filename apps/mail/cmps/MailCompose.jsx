

const { useState } = React

export function MailCompose({ onMailSent }) {
    const [newMail, setNewMail] = useState({
        to: '',
        subject: '',
        body: '',
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setNewMail((prevMail) => ({
            ...prevMail,
            [name]: value,
        }))
    }

    function handleSend() {
        if (newMail.to && newMail.subject && newMail.body) {
            mailService.save({
                ...newMail,
                isRead: false,
                isStared: false,
                labels: [],
                from: mailService.getLoggedinUser().email,
                sentAt: Date.now(),
            }).then(() => {
                onMailSent()
            })
        } else {
            alert("Please fill out all fields before sending.")
        }
    }

    function handleDiscard() {
        onMailSent()
    }

    return (
        <section className="mail-compose">
            <div className="compose-header">
                <h3><i className="fas fa-envelope"></i> New Message</h3>
                <button onClick={handleDiscard} className="close-compose">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <input
                type="email"
                name="to"
                placeholder="To"
                value={newMail.to}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={newMail.subject}
                onChange={handleChange}
                required
            />
            <textarea
                name="body"
                placeholder="Message body..."
                value={newMail.body}
                onChange={handleChange}
                required
            />
            <div className="compose-actions">
                <button onClick={handleSend} className="send-btn">
                    <i className="fas fa-paper-plane"></i> Send
                </button>
                <button onClick={handleDiscard} className="discard-btn">
                    <i className="fas fa-trash"></i> Discard
                </button>
            </div>
        </section>
    )
}