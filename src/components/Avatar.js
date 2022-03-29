// styles
import './Avatar.css';

const Avatar = ({ src, title }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" title={title} />
    </div>
  );
}
 
export default Avatar;