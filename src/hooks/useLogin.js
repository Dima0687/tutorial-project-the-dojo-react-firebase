import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      const resp = await projectAuth.signInWithEmailAndPassword(email, password);
      const { uid } = resp.user;

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: resp.user });

      // update online status
      await projectFirestore.collection('users').doc(uid).update({ online: true });
  
      // update state
      if(!isCancelled){
        setIsPending(false);
        setError(null);
      }   
    } catch (err) {
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

  return { error, isPending, login }
}