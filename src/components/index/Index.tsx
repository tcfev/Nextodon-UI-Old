import { Link, Outlet } from "react-router-dom";

export default function Index () {
    return (
        <div className="nav">
            <nav>
                <ul>
                    <li>
                        <p>Already a member?</p>
                        <Link to="/authenticate">Authenticate</Link>
                    </li>
                    <li>
                        <p>Become a member</p>
                        <Link to="/generate">Generate</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
            <span>v2.0.0</span>
        </div>
    );
}