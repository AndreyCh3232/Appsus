const STORAGE_KEY = "mailDB"

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

function _loadMails() {
    const mails = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultMails
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mails))
    return mails
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

function countSentMails() {
    const mails = _loadMails()
    return mails.filter(mail => getMailStatus(mail) === 'sent').length
}

function countTrashMails() {
    const mails = _loadMails()
    return mails.filter(mail => mail.removedAt).length
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
    {
        id: 'e106',
        createdAt: 1551433930500,
        subject: 'Weekly Team Sync',
        body: 'Here\'s a reminder for our weekly sync tomorrow at 9 AM.',
        isRead: true,
        sentAt: 1551433930594,
        removedAt: null,
        from: 'manager@company.com',
        to: 'user@appsus.com',
        labels: ['work', 'meeting'],
        isStared: true,
    },
    {
        id: 'e107',
        createdAt: 1551533930500,
        subject: 'Exclusive Offer for You!',
        body: 'We have a special discount just for you. Get 20% off on your next purchase.',
        isRead: false,
        sentAt: 1551533930594,
        removedAt: null,
        from: 'promo@shopping.com',
        to: 'user@appsus.com',
        labels: ['promotion'],
        isStared: false,
    },
    {
        id: 'e108',
        createdAt: 1551633930500,
        subject: 'Party Invitation',
        body: 'You\'re invited to our end-of-year celebration! Let us know if you can make it.',
        isRead: true,
        sentAt: 1551633930594,
        removedAt: null,
        from: 'events@company.com',
        to: 'user@appsus.com',
        labels: ['event', 'work'],
        isStared: true,
    },
    {
        id: 'e109',
        createdAt: 1551733930500,
        subject: 'Job Application Update',
        body: 'Thank you for applying. We are reviewing your application and will get back to you soon.',
        isRead: false,
        sentAt: 1551733930594,
        removedAt: null,
        from: 'hr@company.com',
        to: 'user@appsus.com',
        labels: ['job', 'important'],
        isStared: false,
    },
    {
        id: 'e110',
        createdAt: 1551833930500,
        subject: 'Your order has shipped!',
        body: 'Your order #123456 has been shipped and is on its way.',
        isRead: true,
        sentAt: 1551833930594,
        removedAt: null,
        from: 'orders@shopping.com',
        to: 'user@appsus.com',
        labels: ['order', 'shopping'],
        isStared: false,
    },
]
