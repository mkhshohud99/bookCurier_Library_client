import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxios from "../hooks/useAxios";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('')
    const googleProvider = new GoogleAuthProvider;
    const axiosInstance = useAxios();

    const registerWithEmailAndPassword = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const handleGoogleSignin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        if (!user) return;
        axiosInstance.get(`/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
                // console.log(role);
                // (res.data.role)
                setLoading(false)
                setRoleLoading(false)
            })
    }, [user])
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => {
            unSubscribe();
        }
    }, [])
    const authData = {
        registerWithEmailAndPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading,
        roleLoading,
        role
    }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;