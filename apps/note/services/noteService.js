export const noteService = {
    query,
    getById,
    remove,
    add,
    update,
    makeId,
}

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d',
        },
        info: {
            txt: 'Fullstack Me Baby!',
        },
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me',
        },
        style: {
            backgroundColor: '#00d',
        },
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 },
            ],
        },
    },
]

function query(filterBy = {}) {
    const { search, type } = filterBy
    return Promise.resolve(
        gNotes.filter((note) => {
            let searchMatch = true

            if (search) {
                searchMatch =
                    (note.info.txt && note.info.txt.includes(search)) ||
                    (note.info.title && note.info.title.includes(search))
            }

            const typeMatch = !type || note.type === type

            return searchMatch && typeMatch
        })
    )
}

function getById(noteId) {
    const note = gNotes.find((note) => note.id === noteId)
    return Promise.resolve(note)
}

function remove(noteId) {
    gNotes = gNotes.filter((note) => note.id !== noteId)
    return Promise.resolve()
}

function add(note) {
    gNotes.push(note)
    return Promise.resolve()
}

function update(updatedNote) {
    const idx = gNotes.findIndex((note) => note.id === updatedNote.id)
    gNotes.splice(idx, 1, updatedNote)
    return Promise.resolve()
}

function makeId(length = 5) {
    var result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}