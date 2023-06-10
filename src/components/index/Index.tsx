import { Link, Outlet } from "react-router-dom";

export default function Index () {
    return (
        <div className="nav">
            <nav>
                <ul>
                    <li>
                        <Link to="/authenticate">Already a member?</Link>
                    </li>
                    <li>
                        <Link to="/generate">Become a member</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
            <span>v2.0.0</span>
        </div>
    );
}