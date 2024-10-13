import { mailService } from "../services/mailService.js";

const { useState } = React

export function MailCompose({ onMailSent, onSetFilter }) {
    const [newMail, setNewMail] = useState({
        to: '',
        subject: '',
        body: '',
    })
    const [errors, setErrors] = useState({})

    function handleChange(event) {
        const { name, value } = event.target;
        setNewMail((prevMail) => ({
            ...prevMail,
            [name]: value,
        }))
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email);
    }

    function handleSend() {
        const newErrors = {}

        if (!newMail.to || !validateEmail(newMail.to)) {
            newErrors.to = "Please enter a valid email address."
        }

        if (!newMail.subject) {
            newErrors.subject = "Subject is required."
        }

        if (!newMail.body) {
            newErrors.body = "Body is required."
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        mailService.save({
            ...newMail,
            isRead: false,
            isStared: false,
            labels: [],
            from: "user@appsus.com",
            sentAt: Date.now(),
        }).then(() => {
            onMailSent()
            onSetFilter({ status: 'sent' })
        })
    }

    function handleSaveDraft() {
        mailService.saveDraft({
            ...newMail,
            isRead: false,
            isStared: false,
            labels: ['draft'],
            from: "user@appsus.com",
            sentAt: null,
        }).then(() => {
            alert("Draft saved!")
            onMailSent()
        })
    }

    function handleDiscard() {
        onMailSent()
        // onSetFilter({ status: 'sent' })
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
            {errors.to && <p className="error">{errors.to}</p>}


            <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={newMail.subject}
                onChange={handleChange}
                required
            />
            {errors.subject && <p className="error">{errors.subject}</p>}


            <textarea
                name="body"
                placeholder="Message body..."
                value={newMail.body}
                onChange={handleChange}
                required
            />
            {errors.body && <p className="error">{errors.body}</p>}

            <div className="compose-actions">
                <button onClick={handleSend} className="send-btn">
                    <i className="fas fa-paper-plane"></i> Send
                </button>
                <button onClick={handleDiscard} className="discard-btn">
                    <i className="fas fa-trash"></i> Discard
                </button>
                <button onClick={handleSaveDraft} className="save-draft-btn">
                    <i className="fas fa-save"></i> Save Draft
                </button>
            </div>
        </section>
    )
}