const { Link, NavLink } = ReactRouterDOM
const { useRef } = React

export function AppHeader() {
    const menuToggleRef = useRef(null)


    function closeMenu() {
        if (menuToggleRef.current) {
            menuToggleRef.current.checked = false
        }
    }

    return (

        <header className="app-header">
            <Link to="/" className="logo">
                <h3>LOGO!</h3>
            </Link>
            <input ref={menuToggleRef}
                type="checkbox"
                id="active"
                className="menu-toggle"
            />
            <label htmlFor="active" className="menu-btn">
                <i className="fas fa-bars"></i>
            </label>
            <div className="wrapper">
                <ul className="nav-list">
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={closeMenu}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mail"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={closeMenu}
                        >
                            Mail
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/note"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={closeMenu}
                        >
                            Note
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}

