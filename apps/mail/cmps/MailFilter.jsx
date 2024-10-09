export default function MailFilter({ onSetFilter, onSetSort }) {
    function handleSortChange(event) {
        const { name, value } = event.target
        onSetFilter({ [name]: value })
    }

    function handleSortChange(event) {
        const { value } = event.target;
        const [sortBy, order] = value.split('-');
        onSetSort({ sortBy, order });
    }

    return (
        <section className="mail-filter">
            <input type="text"
                name="txt"
                placeholder="Search mail..."
                onChange={handleSortChange}
            />
            <select name="status" onChange={handleSortChange}>
                <option value="inbox">Inbox</option>
                <option value="stared">Starred</option>
                <option value="sent">Sent</option>
                <option value="trash">Trash</option>
                <option value="draft">Draft</option>
            </select>
            <select name="sort" onChange={handleSortChange}>
                <option value="date-asc">Date (Ascending)</option>
                <option value="date-desc">Date (Descending)</option>
                <option value="title-asc">Title (Ascending)</option>
                <option value="title-desc">Title (Descending)</option>
            </select>
        </section>
    )
}