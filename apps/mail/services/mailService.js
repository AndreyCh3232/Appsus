const mails = [
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
        isStared: false
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
    getLoggedinUser
}

function query(filterBy = {}) {
    return Promise.resolve(mails.filter(mail => {
        if (filterBy.status && filterBy.status !== getMailStatus(mail)) return false
        if (filterBy.txt && !mail.subject.toLowerCase().includes(filterBy.txt.toLowerCase())) return false
        if (filterBy.isRead !== undefined && mail.isRead !== filterBy.isRead) return false
        if (filterBy.isStared !== undefined && mail.isStared !== filterBy.isStared) return false
        return true;
    }))
}

function getById(mailId) {
    return Promise.resolve(mails.find(mail => mail.id === mailId))
}

function remove(mailId) {
    const idx = mails.findIndex(mail => mail.id === mailId)
    if (idx !== -1) mails.splice(idx, 1)
    return Promise.resolve()
}

function save(mail) {
    mail.id = makeId()
    mail.createdAt = Date.now()
    mails.push(mail)
    return Promise.resolve(mail)
}

function update(mailToUpdate) {
    const idx = mails.findIndex(mail => mail.id === mailToUpdate.id)
    if (idx !== -1) mails[idx] = mailToUpdate
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