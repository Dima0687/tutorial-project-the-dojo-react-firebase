import { v4 as uuid } from 'uuid';
import { useState } from 'react';

//firebase
import { timestamp } from '../../firebase/config';

//hooks
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectComments = () => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuid()
    }
    console.log(commentToAdd)
  }
  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>
      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={ e => setNewComment(e.target.value) }
            value={newComment}
          />
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
 
export default ProjectComments;