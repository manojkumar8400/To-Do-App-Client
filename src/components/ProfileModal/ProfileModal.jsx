import React, { useState } from 'react'
import './../Common.scss'
import defaultProfile from '../../assets/profile-user.png'
import close from '../../assets/close.png'
import { useAuthContext } from '../../contexts/AuthContext'

export const ProfileModal = () => {
  const { userData, setIsProfilePreview, updateProfile } = useAuthContext()
  const [selectedFile, setSelectedFile] = useState(null)

  const handleAvatarUpload = (e) => {
    console.log(e.target.files[0], '----')
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = (data) => {
    const formData = new FormData()
    formData.append('avatar', selectedFile);
    formData.append('email', data?.email)
    formData.append('username', data?.username)
    formData.append('password', data?.password)
    updateProfile(formData);
  }

  return (  
    <div className="profile-main-div">
      <div className="profile-modal">
        <img
          onClick={() => setIsProfilePreview(false)}
          className="close"
          src={close}
          alt="profile"
        />
        <input type="file" onChange={(e) => handleAvatarUpload(e)} />
        <img className="avatar" src={`http://localhost:4000/${userData?.user?.avatar}`} alt="profile" />

        <h3 className="welcome-txt">Welcome {userData?.user?.username}!</h3>
        <div className="email">
          <span>Email : </span>
          <span>{userData?.user?.email}</span>
        </div>
        <div className="password">
          <span>password : </span>
          <span>{userData?.user?.password}</span>
        </div>
        <button onClick={() => handleUpload(userData?.user)}>Save</button>
      </div>
    </div>
  )
}
