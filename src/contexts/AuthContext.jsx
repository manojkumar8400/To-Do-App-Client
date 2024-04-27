import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  const [isProfilePreview, setIsProfilePreview] = useState(false)
  const [token, setToken] = useState(null);
  const [isLogout, setIsLogout] = useState(false);

  const pathname = new URL(window.location.href).pathname
console.log('Auth');
  useEffect(() => {
    console.log('inside auth useEffect');

    setToken(localStorage.getItem('toDoToken'));
    (async () => {
      console.log('inside auth async');
      const authToken = localStorage.getItem('toDoToken')
      try {
        const { data } = await axios.get('http://localhost:4000/auth/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        setUserData(data)
        if (data.statusCode !== 200 && pathname !== '/auth') {
          window.location.href = '/auth'
        } else if(data.statusCode === 200 && pathname !== '/') {
          window.location.href = '/'
        }
        return data
      } catch (error) {
        if(pathname !== '/auth'){
          window.location.href = '/auth'
        }
        console.log(error)
      }
    })()
  }, [isLogout]);

  const userSignup = async (userBody, setSignupData) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/auth/signup',
        userBody
      )
      localStorage.setItem('toDoToken', data?.token)
      setSignupData({
        username: '',
        email: '',
        password: '',
      })
      if (data.statusCode === 201) {
        // Redirect to the home page or any other page
        window.location.href = '/'
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const userSignin = async (userBody, setLoginData) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/auth/login',
        userBody
      )
      localStorage.setItem('toDoToken', data?.token)
      setLoginData({
        email: '',
        password: '',
      })
      console.log(data, '=====')
      if (data.statusCode === 200) {
        // Redirect to the home page or any other page
        window.location.href = '/'
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const updateProfile = async (updatedData) => {
    console.log({updatedData});
    try {
      const { data } = await axios.put(`http://localhost:4000/auth/updateProfile`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log({data});
      return data
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userSignup,
        userSignin,
        userData,
        isProfilePreview,
        setIsProfilePreview,
        updateProfile,
        setIsLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}

export { AuthProvider, useAuthContext }
