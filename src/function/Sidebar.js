import {FaCalendarPlus, FaUserCog, FaCalendar, FaPowerOff} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-orange-500 dark:bg-orange-800 text-white shadow-xl">
                <Link to="/vk-app-react/open"><SidebarIcon icon={<FaCalendarPlus size="28"/>} text="Offene Einsätze"/></Link>
                <Link to="/vk-app-react/mine"><SidebarIcon icon={<FaCalendar size="28"/>} text="Meine Einsätze"/></Link>
            </div>
            <div className="fixed bottom-0 left-0 w-16 m-0 flex flex-col bg-orange-500 dark:bg-orange-800 text-white shadow-xl">
                <Link to="/vk-app-react/person"><SidebarIcon icon={<FaUserCog size="28"/>} text="Personalien"/></Link> 
                <Link to="/vk-app-react/" onClick={window.location.reload}><SidebarIcon icon={<FaPowerOff size="28"/>} text="Abmelden"/></Link> 
            </div>
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