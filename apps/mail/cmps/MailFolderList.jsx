const { useState, useCallback } = React

export default function MailFolderList({ onSetFilter, onComposeMail, starredCount, inboxCount, sentCount, trashCount, draftCount }) {
    const handleFilterChange = useCallback(
        (folder) => {
            setActiveFolder(folder)
            onSetFilter({ status: folder })
        }, [onSetFilter]
    )

    const [activeFolder, setActiveFolder] = useState('inbox')

    return (
        <section className="mail-folder-list">
            {/* <button className="compose-btn" onClick={onComposeMail}>
                <i className="fas fa-pen"></i> Compose
            </button>
            <ul className="folders">
                <li onClick={() => handleFilterChange('inbox')}>
                    <i className="fas fa-inbox"></i> Inbox ({inboxCount})
                </li>

                <li onClick={() => handleFilterChange('starred')}>
                    <i className="fas fa-star"></i> Starred ({starredCount})
                </li>

                <li onClick={() => handleFilterChange('sent')}>
                    <i className="fas fa-paper-plane"></i> Sent ({sentCount})
                </li>
                <li onClick={() => handleFilterChange('trash')}>
                    <i className="fas fa-trash"></i> Trash ({trashCount})
                </li>
                <li onClick={() => handleFilterChange('draft')}>
                    <i className="fas fa-file-alt"></i> Draft ({draftCount})
                </li>
            </ul> */}
            <button className="compose-btn" onClick={onComposeMail}>
                <i className="fas fa-pen"></i> Compose
            </button>
            <ul className="folders">
                <li
                    className={activeFolder === 'inbox' ? 'active' : ''}
                    onClick={() => handleFilterChange('inbox')}
                >
                    <i className="fas fa-inbox"></i> Inbox ({inboxCount})
                </li>

                <li
                    className={activeFolder === 'starred' ? 'active' : ''}
                    onClick={() => handleFilterChange('starred')}
                >
                    <i className="fas fa-star"></i> Starred ({starredCount})
                </li>

                <li
                    className={activeFolder === 'sent' ? 'active' : ''}
                    onClick={() => handleFilterChange('sent')}
                >
                    <i className="fas fa-paper-plane"></i> Sent ({sentCount})
                </li>
                <li
                    className={activeFolder === 'trash' ? 'active' : ''}
                    onClick={() => handleFilterChange('trash')}
                >
                    <i className="fas fa-trash"></i> Trash ({trashCount})
                </li>
                <li
                    className={activeFolder === 'draft' ? 'active' : ''}
                    onClick={() => handleFilterChange('draft')}
                >
                    <i className="fas fa-file-alt"></i> Draft ({draftCount})
                </li>
            </ul>
        </section>
    )
}