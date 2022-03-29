import { useState, useEffect } from 'react';
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null); // reset the Error
    setIsPending(true); // set is Pending on true

    try {
      // signup user
      const resp = await projectAuth.createUserWithEmailAndPassword(email, password);
     
      if(!resp){
        throw new Error('Could not complete signup!');
      }

      // uplaod user thumbnail
      const uploadPath = `thumbnails/${resp.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();

      if(!imgURL){
        throw new Error('Could not create a new image folder');
      }

      // add display name to user
      await resp.user.updateProfile({ displayName, photoURL: imgURL });

      // create a user document
      await projectFirestore.collection('users').doc(resp.user.uid).set({
        online: true,
        displayName,
        photoURL: imgURL
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: resp.user })

      // update state
      if(!isCancelled){
        setIsPending(false);
        setError(null);
      }

    } catch(err) {
      if(!isCancelled){
        console.log(err.message);
        setError(err.message);
        setIsPending(false); 
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup }
}