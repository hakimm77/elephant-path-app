import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../helpers/auth/firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      //   setUser(result.user);
      console.log(result.user);
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user, signInWithGoogle };
}
