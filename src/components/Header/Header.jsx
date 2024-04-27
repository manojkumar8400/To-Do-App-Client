import React from 'react'
import './../Common.scss'
import defaultProfile from '../../assets/profile-user.png'
import { useAuthContext } from '../../contexts/AuthContext'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const { setIsProfilePreview } = useAuthContext()
  return (
    <header className="list-header">
      <NavLink to="/">
        <h2>TODO APP</h2>
      </NavLink>
      <img
        onClick={() => setIsProfilePreview(true)}
        src={defaultProfile}
        alt="profile"
      />
    </header>
  )
}
