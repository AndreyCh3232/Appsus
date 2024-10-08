
export default function NoteTodos({ note, onChangeInfo }) {
    const { info } = note

    function toggleTodo(index) {
        const newTodos = info.todos.map((todo, idx) => {
            if (idx === index) {
                return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
            }
            return todo;
        })
        onChangeInfo({ ...info, todos: newTodos })
    }

    return (
        <div className="note-todos">
            <h3>{info.title}</h3>
            <ul>
                {info.todos.map((todo, index) => (
                    <li key={index} onClick={() => toggleTodo(index)}>
                        <span className={todo.doneAt ? 'done' : ''}>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}