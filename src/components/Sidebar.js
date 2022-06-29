import {FaCalendarPlus, FaUserCog, FaCalendar} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-orange-500 dark:bg-orange-800 text-white shadow-xl">
            <Link to="open"><SidebarIcon icon={<FaCalendarPlus size="28"/>} text="Offene Einsätze"/></Link>
            <Link to="mine"><SidebarIcon icon={<FaCalendar size="28"/>} text="Meine Einsätze"/></Link>
            <Link to="person"><SidebarIcon icon={<FaUserCog size="28"/>} text="Personalien"/></Link>
        </div>
    );
};

const SidebarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-text group-hover:scale-100">
            {text}
        </span>
    </div>
);
export default Sidebar;