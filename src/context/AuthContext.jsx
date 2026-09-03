// import { createContext, useState, useContext, useEffect } from 'react'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null)
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true) 

//   const login = (newToken, userData) => {
//     setToken(newToken)
//     setUser(userData)
//     localStorage.setItem('token', newToken)
//     localStorage.setItem('user', JSON.stringify(userData))
//   }

//   const logout = () => {
//     setToken(null)
//     setUser(null)
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//   }

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token')
//     const savedUser = localStorage.getItem('user')
    
//     if (savedToken) {
//       setToken(savedToken)
//       setUser(savedUser ? JSON.parse(savedUser) : null)
//       setLoading(false)
//       return 
//     }

    
//     // if (import.meta.env.DEV) {
//     //   console.log('Режим разработки: автологин')
//     //   const devToken = 'dev-fake-jwt-token-12345'
//     //   const devUser = { username: 'dev_user' }
//     //   localStorage.setItem('token', devToken)
//     //   localStorage.setItem('user', JSON.stringify(devUser))
//     //   setToken(devToken)
//     //   setUser(devUser)
//     // }
    
//     setLoading(false)
//   }, []) 

  
//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-500">Загрузка...</div>
//   }

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }