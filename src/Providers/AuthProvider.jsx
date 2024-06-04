import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
// import { GoogleAuthProvider } from "firebase/auth/cordova";

export const AuthContext =createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null);
    const [loading ,setLoading] =useState(true);

    // const googleProvider = new GoogleAuthProvider();
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic();
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email,password)
    }
    const signIn = (email, password) =>{
     setLoading(true);
     return signInWithEmailAndPassword( auth, email,password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);

    }

    const logOut =() =>{
        setLoading(true);
        return signOut(auth);
    }
    const updatedUserProfile =(name, photo) =>{
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo 
        });
       
    }
    useEffect(() =>{
       const unSubscriber = onAuthStateChanged( auth ,currentUser =>{
        setUser(currentUser);
         if(currentUser){
            // get token and store client
            const userInfo = { email: currentUser.email}
            axiosPublic.post('/jwt', userInfo )
            .then(res => {
                if (res.data.token){

                    localStorage.setItem('access-token', res.data.token);
                    setLoading(false);
                }
            })
         }
         else{
            //Remove token whi=en token stored in the client
            localStorage.removeItem('access-token')
            setLoading(false);
         }

       } )
       return ()=>{
        return unSubscriber();
       }
    },[axiosPublic])
    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updatedUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;








