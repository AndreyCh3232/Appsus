const STORAGE_KEY = "mailDB"

const defaultMails = [
    {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        labels: ['important'],
        isStared: false,
    },
    {
        id: 'e102',
        createdAt: 1551133930500,
        subject: 'Meeting Reminder',
        body: 'Don\'t forget the meeting tomorrow at 10 AM.',
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'jane@company.com',
        to: 'user@appsus.com',
        labels: ['work'],
        isStared: true,
    },
    {
        id: 'e103',
        createdAt: 1651133930500,
        subject: 'Your subscription is about to expire',
        body: 'Please renew your subscription to continue enjoying our service.',
        isRead: false,
        sentAt: 1651133930594,
        removedAt: null,
        from: 'service@streaming.com',
        to: 'user@appsus.com',
        labels: ['subscription'],
        isStared: false,
    },
    {
        id: 'e104',
        createdAt: 1551233930500,
        subject: 'Vacation Plans',
        body: 'Let\'s finalize the dates and destinations for our vacation.',
        isRead: false,
        sentAt: 1551233930594,
        removedAt: null,
        from: 'alex@travel.com',
        to: 'user@appsus.com',
        labels: ['personal'],
        isStared: false,
    },
    {
        id: 'e105',
        createdAt: 1551333930500,
        subject: 'Invoice for March',
        body: 'Attached is your invoice for the month of March. Please review it and let us know if you have any questions.',
        isRead: true,
        sentAt: 1551333930594,
        removedAt: null,
        from: 'billing@company.com',
        to: 'user@appsus.com',
        labels: ['finance'],
        isStared: false,
    },
]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    getById,
    remove,
    save,
    update,
    toggleStar,
    saveDraft,
    markAsReadUnread,
    getLoggedinUser,
    countStarredMails,
    countInboxMails,
    countSentMails,
    countTrashMails,
    countDraftMails,
}

function countSentMails() {
    const mails = _loadMails()
    return mails.filter(mail => getMailStatus(mail) === 'sent').length
}

function countTrashMails() {
    const mails = _loadMails()
    return mails.filter(mail => getMailStatus(mail) === 'trash').length
}

function countDraftMails() {
    const mails = _loadMails()
    return mails.filter(mail => getMailStatus(mail) === 'draft').length
}

function countInboxMails() {
    const mails = _loadMails()
    return mails.filter(mail => getMailStatus(mail) === 'inbox').length
}

function toggleStar(mailId) {
    const mails = _loadMails()
    const mail = mails.find(mail => mail.id === mailId)
    if (mail) {
        mail.isStared = !mail.isStared
        _saveMailsToStorage(mails)
        return Promise.resolve(mail)
    }
    return Promise.reject('Mail not found')
}

function countStarredMails() {
    const mails = _loadMails()
    return mails.filter(mail => mail.isStared).length
}

function _loadMails() {
    const mails = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultMails
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mails))
    return mails
}

function query(filterBy = {}) {
    let mails = _loadMails()

    if (filterBy.status) {
        if (filterBy.status === 'starred') {
            mails = mails.filter(mail => mail.isStared)
        } else {
            mails = mails.filter(mail => getMailStatus(mail) === filterBy.status)
        }
        if (filterBy.txt) {
            mails = mails.filter(mail =>
                mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                mail.body.toLowerCase().includes(filterBy.txt.toLowerCase())
            )
        }
    }

    return Promise.resolve(mails)
}

function getById(mailId) {
    const mails = _loadMails()
    return Promise.resolve(mails.find((mail) => mail.id === mailId))
}

function remove(mailId) {
    let mails = _loadMails()
    mails = mails.filter((mail) => mail.id !== mailId)
    _saveMailsToStorage(mails)
    return Promise.resolve()
}

function save(mail) {
    const mails = _loadMails()
    if (mail.id) {
        const idx = mails.findIndex((m) => m.id === mail.id)
        mails[idx] = mail;
    } else {
        mail.id = makeId()
        mail.createdAt = Date.now()
        mails.push(mail)
    }
    _saveMailsToStorage(mails)
    return Promise.resolve(mail)
}

function _saveMailsToStorage(mails) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mails))
}

function update(mailToUpdate) {
    const mails = _loadMails()
    const idx = mails.findIndex(mail => mail.id === mailToUpdate.id)
    if (idx !== -1) mails[idx] = mailToUpdate
    _saveMailsToStorage(mails)
    return Promise.resolve(mailToUpdate)
}

function getLoggedinUser() {
    return loggedinUser
}

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function getMailStatus(mail) {
    if (mail.removedAt) return 'trash'
    if (!mail.sentAt) return 'draft'
    if (mail.to === loggedinUser.email) return 'inbox'
    return 'sent'
}

function markAsReadUnread(mailId, isRead) {
    const mails = _loadMails()
    const mail = mails.find(mail => mail.id === mailId)
    if (mail) {
        mail.isRead = isRead
        _saveMailsToStorage(mails)
        return Promise.resolve(mail)
    }
    return Promise.reject('Mail not found')
}

function saveDraft(draftMail) {
    const mails = _loadMails()
    if (draftMail.id) {
        const idx = mails.findIndex((m) => m.id === draftMail.id)
        mails[idx] = draftMail;
    } else {
        draftMail.id = makeId()
        draftMail.createdAt = Date.now()
        draftMail.sentAt = null
        mails.push(draftMail)
    }
    _saveMailsToStorage(mails)
    return Promise.resolve(draftMail)
}