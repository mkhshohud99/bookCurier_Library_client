import {
    HomeIcon,
    UsersIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Aside = () => {
    const { user } = useContext(AuthContext);
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-gray-200 fixed">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-gray-700">
                <Link to='/' className="text-xl font-bold text-white">
                    BookCurier <span className="text-indigo-400">Admin</span>
                </Link>
            </div>

            {/* Menu */}
            <nav className="mt-6">
                <ul className="space-y-2 px-4">

                    <NavItem to="main" icon={<HomeIcon />} label="Dashboard" />
                    <NavItem to="add-books" icon={<UsersIcon />} label="Add Books" />
                    <NavItem to="/admin/books" icon={<BookOpenIcon />} label="Manage Books" />
                    <NavItem to="/admin/orders" icon={<ClipboardDocumentListIcon />} label="Orders" />
                    <NavItem to="/admin/settings" icon={<Cog6ToothIcon />} label="Settings" />

                    <li className="border-t border-gray-700 mt-4 pt-4">
                        { user &&
                            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-red-400 hover:bg-gray-800">
                            <ArrowRightOnRectangleIcon onClick={()=> signOut(auth)} className="w-5 h-5" />
                            Logout
                        </button>}
                        { !user && 
                            <Link to={'/login'} className="btn">Login</Link>
                        }
                    </li>

                </ul>
            </nav>
        </aside>
    );
};

const NavItem = ({ to, icon, label }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition
        ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800"}`
            }
        >
            <span className="w-5 h-5">{icon}</span>
            {label}
        </NavLink>
    </li>
);

export default Aside;
