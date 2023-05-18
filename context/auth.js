// contexts/auth.js
import React, { createContext, useState, useContext, useEffect, SetStateAction, Dispatch } from 'react'
import Cookies from 'js-cookie'
import { Magic } from "magic-sdk";
import { fetchDataFromApi } from '../utils/api';

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || `pk_live_7AD445C4519595C4`
const AuthContext = createContext({});
let magic;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        async function loadUserFromCookies() {
            if(!checking)
            await checkLogged()
        }
        magic = new Magic(MAGIC_PUBLIC_KEY, { locale: `pt` })
        loadUserFromCookies()
    }, [])

    const checkLogged = async() => {
        setChecking(true)
        setLoading(true)
        const isLoggedIn = await magic.user.isLoggedIn();
        if(isLoggedIn){
            const { email } = await magic.user.getMetadata();
            setUser({ email })
            await loginOrRegister(email)
        }
        setLoading(false)
        setChecking(false)
    }

    const loginOrRegister = async(email) => {
        if(email)
        // se não tem o email cadastrado no railway, então cadastra
        try{
            const verifica = await fetchDataFromApi(`verify_email`, {
                email: email
            })
            //console.log('loginOrRegister', verifica)
            if(verifica){
                setUser({ ...user, ...verifica })
            }
        }catch(err){
            console.log('errr,', err)
        }
    }

    const login = async (email, password) => {
        /*const { data: data_user } = await Api.post('/login', { email: email, senha: password })
        //console.log('loginnndata', data_user)
        if(data_user.status){
            Cookies.set('cpyonline_token', data_user.token, { expires: 60 })
            setUser(data_user.user_data)
            return true
        }else{
            return false
        }*/
    }

    const logout = () => {
        Cookies.remove('cpyonline_token')
        setUser(null)
    }

    const magicAuth = async(email) => {
        setLoading(true)
        try{
            const tokenLogin = await magic.auth.loginWithEmailOTP({ email })
            //console.log('tokenLogin', tokenLogin)
            if(tokenLogin){
                Cookies.set('cpyonline_token', tokenLogin, { expires: 60 })
                await loginOrRegister(email)
                //window.localStorage.setItem(`cpyonline_token`, tokenLogin)
            }
            setLoading(false)
            //router.push(`/`)
        }catch(err){
            setLoading(false)
            setUser(null)
        }
    }

    const magicLogout = async () => {
        setLoading(true)
        try{
            await magic.user.logout()
            setUser(null)
            Cookies.remove('cpyonline_token')
            //window.localStorage.removeItem(`weshine_token`)
            setLoading(false)
        }catch(err){
            setLoading(false)
            // failed to logout
        }
    }

    const getFreshBalance = async() => {
        if(user?.id){
            const balance = await fetchDataFromApi(`get_balance/${user?.id}`)
            //console.log('loginOrRegister', verifica)
            if(balance){
                setUser({ ...user, balance: balance })
            }
        }
    }

    const updateBalance = async(new_amount, id_user, prompt, result, discounted) => {
        /*const token = Cookies.get('cpyonline_token')
        const { data: data_res } = await Api.post('/update_balance', {
            token: token,
            amount: new_amount,
            id_user: id_user,
            prompt: prompt,
            result: result,
            discounted: discounted
        })
        console.log('updateBalance', data_res)
        if(data_res.status){
            setUser({ ...user, balance: data_res.balance })
        }*/
    }

    const addBalance = async(add_amount, id_user, idPix) => {
        /*const token = Cookies.get('cpyonline_token')
        if(token && idPix){
            const { data: data_res } = await Api.post('/update_balance', {
                token: token,
                idPix: idPix,
                amount: add_amount,
                id_user: id_user
            })
            console.log('updateBalance', data_res)
            if(data_res.status){
                setUser({ ...user, balance: data_res.balance })
            }
        }*/
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, getFreshBalance, magicAuth, magicLogout, login, logout, updateBalance, addBalance, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)