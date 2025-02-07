import { createContext, useEffect, useState } from "react"

export const authContext = createContext();


export default function Authcontextprovider( {children} ) {

    const [userToken, setuserToken] = useState(null) ;



    useEffect(function() {

      const token = localStorage.getItem('userToken') ;
      if (token != null) {
        setuserToken (token) ;
      }

    } , [])
  return (
    <authContext.Provider value={ { setToken : setuserToken, userToken,
      } } >
        {children}
    </authContext.Provider>
  )
}
