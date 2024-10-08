import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
    getSpeedStats,
    getVendorStats,
    createNote
}
// For Debug (easy access from console):
window.cs = noteService
//var note = createNote('title')

//console.log("creating new note using func",note)

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }

            if (filterBy.isPinned === true) {
                console.log("is pinned", filterBy.isPinned);

                notes = notes.filter(note => note.isPinned === true)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            note = _setNextPrevNoteId(note)
            return note
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter() {
    return { txt: '' }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    console.log('defalut:', defaultFilter)

    const filterBy = {}
    for (const field in defaultFilter) {
        console.log('field:', defaultFilter);

        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getSpeedStats() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            const noteCountBySpeedMap = _getNoteCountBySpeedMap(notes)
            const data = Object.keys(noteCountBySpeedMap).map(speedName => ({ title: speedName, value: noteCountBySpeedMap[speedName] }))
            return data
        })
}

function getVendorStats() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            const noteCountByVendorMap = _getNoteCountByVendorMap(notes)
            const data = Object.keys(noteCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((noteCountByVendorMap[vendor] / notes.length) * 100)
                }))
            return data
        })
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (notes && notes.length > 0) return notes
    notes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            title: "heres a title",
            style: { //style optional
                backgroundColor: '#00d'
            },
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            title: 'here is a title',
            info: {
                title: 'Bobi and Me',
                txt: 'I have img url and title lorem ipusomxDlorem ipusomxDlorem ipusomxD',
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            title: 'Get my stuff together vlorem ipusomxDlorem',
            info: {
                txt: 'Some Text',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        },
        {
            id: 'n104',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                url: './assets/img/view.jpg'
            }
        },
        {
            id: 'n105',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                url: '../assets/img/view.jpg',
                txt: 'lor ipusomxDlorem ipusomxD'
            }
        },
        {
            id: 'n106',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                url: './assets/img/honda.jpg'
            }
        },
        {
            id: 'n107',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                txt: 'lorem ipusomxDlorem ipusomxDlorem ipusomxDlorem ipusomxD'
            }
        },
        {
            id: 'n108',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                txt: 'lorem ipusomxDlorem ipusomxDlorem ipusomxDlorem ipusomxD'
            }
        },
        {
            id: 'n109',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                url: 'http://youtube.mp4',
                txt: 'lorem ipusomxDlorem ipusomxDlorem'
            }
        },
        {
            id: 'n110',
            createdAt: 1112224,
            type: '',
            isPinned: false,
            info: {
                txt: 'lorem ipusomxDlorem ipusomxDlorem ipusomxDlorem ipusomxD'
            }
        },

    ]
    return utilService.saveToStorage(NOTE_KEY, notes)
}

function _createNote_test(title = '', type = '', isPinned = false, { txt = '', url = null, todo }) {
    return {
        id: makeId(),
        createdAt: new Date(),
        title,
        type,
        isPinned,
        txt,
        url,
        todo
    }
}

function createNote({ type = 'text', isPinned = false, title = '', info = {} } = {}, style = {} = {}) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        title,
        info: {
            txt: info.txt || '',
            todos: info.todos || [],
            url: info.url || ''
        },
        style
    }
}


