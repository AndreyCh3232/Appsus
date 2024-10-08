
import { mailService } from '../services/mailService.js';
import MailList from '../cmps/MailList.jsx';
import MailFilter from '../cmps/MailFilter.jsx';
import MailFolderList from '../cmps/MailFolderList.jsx';
import { MailCompose } from '../cmps/MailCompose.jsx';

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState({
        status: 'inbox',
        txt: '',
        isRead: null
    })
    const [isComposing, setIsComposing] = useState(false)
    const [sortBy, setSortBy] = useState({ sortBy: 'date', order: 'asc' })
    const [starredCount, setStarredCount] = useState(0)

    useEffect(() => {
        loadMails()
        setStarredCount(mailService.countStarredMails())
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy).then((loadedMails) => {
            console.log('Loaded Mails:', loadedMails)
            setMails(loadedMails)
        })
    }

    function onSetFilter(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSetSort(newSort) {
        setSortBy(prevSort => ({ ...prevSort, ...newSort }))
    }

    function onComposeMail() {
        setIsComposing(true)
    }

    function onMailSent() {
        setIsComposing(false)
        loadMails()
    }

    function handleStarToggle(mailId) {
        mailService.toggleStar(mailId).then(() => {
            setStarredCount(mailService.countStarredMails())
            setMails((prevMails) =>
                prevMails.map((mail) =>
                    mail.id === mailId ? { ...mail, isStared: !mail.isStared } : mail
                )
            )
        })
    }

    return (
        <section className="mail-index">
            <MailFolderList onSetFilter={onSetFilter} onComposeMail={onComposeMail} starredCount={starredCount} />
            <div className="mail-content">
                <MailFilter onSetFilter={onSetFilter} onSetSort={onSetSort} />
                <MailList mails={mails} onStar={handleStarToggle} />
                {isComposing && <MailCompose onMailSent={onMailSent} />}
            </div>
        </section>
    )
}