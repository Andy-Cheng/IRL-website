import { createContext } from 'react';

export const AuthContext = createContext({
    user: null, // The default value
    canEdit: false,
    logIn: ()=>{} ,
    logOut: ()=>{}, 
    checkUserState:  () =>{},
});

AuthContext.displayName = "Authentication  Context";