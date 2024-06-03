
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
// import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider();
    const gProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const gitHubSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth,gProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            // console.log('current User', currentUser)
            setUser(currentUser)
            setLoading(false)

    //         if (currentUser) {

    //             axios.post('https://assignment-11-server-side-eta.vercel.app/jwt', loggedUser, {
    //                 withCredentials: true
    //             })
    //                 .then(res => {
    //                     console.log('token response', res.data)
    //                         // if(res.data.success){
    //                         //   navigate(location?.state ? location?.state : '/')
    //                         // }
    //                 })
    //         }
    //         else {
    //             axios.post('https://assignment-11-server-side-eta.vercel.app/logout', loggedUser, {
    //                 withCredentials: true
    //             })
    //                 .then(res => {
    //                     console.log('token response', res.data)
    //                 })
    //         }
        });
        return () => {
            unSubscribe();
        }
    }, [user?.email])
   console.log( "USER DETAILS:", user);
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        gitHubSignIn,
        loading
    }
    return (
        <authContext.Provider value={authInfo}>
            {
                children
            }
        </authContext.Provider>
    );
};

export default AuthProvider;