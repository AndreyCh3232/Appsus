export default function MailFilter({ onSetFilter, onSetSort }) {
    function handleFilterChange(event) {
        const { name, value } = event.target
        onSetFilter({ [name]: value })
    }

    function handleStarredChange(event) {
        onSetFilter({ isStarred: event.target.checked });
    }

    return (
        <section className="mail-filter">
            <input type="text"
                name="txt"
                placeholder="Search mail..."
                onChange={handleFilterChange}
            />
            <select name="status" onChange={handleFilterChange}>
                <option value="inbox">Inbox</option>
                <option value="stared">Starred</option>
                <option value="sent">Sent</option>
                <option value="trash">Trash</option>
                <option value="draft">Draft</option>
            </select>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="isStarred"
                        onChange={handleStarredChange}
                    />
                </label>
            </div>

            <select name="sort" onChange={handleFilterChange}>
                <option value="date-asc">Date (Ascending)</option>
                <option value="date-desc">Date (Descending)</option>
                <option value="title-asc">Title (Ascending)</option>
                <option value="title-desc">Title (Descending)</option>
            </select>
        </section>
    )
}