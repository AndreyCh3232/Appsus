
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
    const [inboxCount, setInboxCount] = useState(0)
    const [sentCount, setSentCount] = useState(0)
    const [trashCount, setTrashCount] = useState(0)
    const [draftCount, setDraftCount] = useState(0)
    const [selectedMailId, setSelectedMailId] = useState(null)

    useEffect(() => {
        loadMails()
        setStarredCount(mailService.countStarredMails())
        setInboxCount(mailService.countInboxMails())
        setSentCount(mailService.countSentMails())
        setTrashCount(mailService.countTrashMails())
        setDraftCount(mailService.countDraftMails())
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy).then((loadedMails) => {
            const sortedMails = sortMails(loadedMails)
            setMails(loadedMails)
        })
    }

    function onSetFilter(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSetSort(sortCriteria) {
        setSortBy(sortCriteria)
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

    function sortMails(mails) {
        return mails.sort((a, b) => {
            if (sortBy === 'date-asc') {
                return a.createdAt - b.createdAt
            } else if (sortBy === 'date-desc') {
                return b.createdAt - a.createdAt
            } else if (sortBy === 'title-asc') {
                return a.subject.localeCompare(b.subject)
            } else if (sortBy === 'title-desc') {
                return b.subject.localeCompare(a.subject)
            }
            return 0
        })
    }

    function onMailSelect(mailId) {
        setSelectedMailId(mailId)
    }

    return (
        <section className="mail-index">
            <MailFolderList
                onSetFilter={onSetFilter}
                onComposeMail={onComposeMail}
                inboxCount={inboxCount}
                starredCount={starredCount}
                sentCount={sentCount}
                trashCount={trashCount}
                draftCount={draftCount}
            />
            <div className="mail-content">
                <MailFilter
                    onSetFilter={onSetFilter}
                    onSetSort={onSetSort}
                />
                <MailList
                    mails={mails}
                    onStar={handleStarToggle}
                    onMailSelect={onMailSelect}
                    selectedMailId={selectedMailId}
                />
                {isComposing && <MailCompose onMailSent={onMailSent} />}
            </div>
        </section>
    )
}