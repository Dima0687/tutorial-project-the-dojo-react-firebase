import { NavLink } from 'react-router-dom';

//assets
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

// styles
import './Sidebar.css';

// components
import Avatar from './Avatar';

// hooks
import { useAuthContext } from '../hooks/useAuthContext';

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} title={user.displayName}/>
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to='/'>
                <img src={DashboardIcon} alt="Dashboard Icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to='/create'>
                <img src={AddIcon} alt="add project Icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
 
export default Sidebar;