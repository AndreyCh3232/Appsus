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
    getLoggedinUser,
    countStarredMails,
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
    const mails = _loadMails()

    // if (filterBy.status) {
    //     return Promise.resolve(
    //         mails.filter(mail => getMailStatus(mail) === filterBy.status)
    //     )
    // }
    // return Promise.resolve(mails)
    if (filterBy.status) {
        if (filterBy.status === 'starred') {
            // Return only starred mails
            return Promise.resolve(mails.filter(mail => mail.isStared))
        }
        return Promise.resolve(
            mails.filter(mail => getMailStatus(mail) === filterBy.status)
        )
    }

    // Return all mails if no status is provided
    return Promise.resolve(mails);

}

function getById(mailId) {
    const mails = _loadMails()
    return Promise.resolve(mails.find((mail) => mail.id === mailId))
}

function remove(mailId) {
    var mails = _loadMails()
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