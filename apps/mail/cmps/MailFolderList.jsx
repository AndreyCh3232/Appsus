const { useCallback } = React

export default function MailFolderList({ onSetFilter, onComposeMail }) {
    const handleFilterChange = useCallback((folder) => {
        onSetFilter({ status: folder })
    }, [onSetFilter])

    return (
        <section className="mail-folder-list">
            <button className="compose-btn" onClick={onComposeMail}>
                <i className="fas fa-pen"></i> Compose
            </button>
            <ul className="folders">
                <li onClick={() => handleFilterChange('inbox')}>
                    <i className="fas fa-inbox"></i> Inbox
                </li>
                <li onClick={() => handleFilterChange('sent')}>
                    <i className="fas fa-paper-plane"></i> Sent
                </li>
                <li onClick={() => handleFilterChange('trash')}>
                    <i className="fas fa-trash"></i> Trash
                </li>
                <li onClick={() => handleFilterChange('draft')}>
                    <i className="fas fa-file-alt"></i> Draft
                </li>
            </ul>
        </section>
    )
}