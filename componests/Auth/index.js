import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { firebaseClient, persistenceMode } from '../../config/firebase/client'

const AuthContext = React.createContext([{}, () => { }])

export const logout = () => firebaseClient.auth().signOut()


export const login = async ({ email, password }) => {

    firebaseClient.auth().setPersistence(persistenceMode);
    try {
        await firebaseClient.auth().signInWithEmailAndPassword(email, password);

    } catch (error) {
        console.log('Login Error:', error)
    }
}


export const singup = async ({ email, password, username }) => {
    try {
        await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
        login({ email, password })
        // setunpProfile(token,username)
    } catch (error) {
        console.log('Singup Error:', error)
    }
}

export const useAuth = () => {
    const [auth] = useContext(AuthContext)

    return [auth, { login, logout, singup }]

}


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: true,
        user: false
    })

    useEffect(() => {
        firebaseClient.auth().onAuthStateChanged(user => {
            setAuth({
                loading: false,
                user
            })
        })
    }, [])


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
