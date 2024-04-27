import { useState } from 'react'
import * as Components from './style'
import { useAuthContext } from '../../contexts/AuthContext'

export const Authentication = () => {
  const { userSignup, userSignin } = useAuthContext()
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [signIn, toggle] = useState(true)

  return (
    <div className="auth-main-container">
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form
            onSubmit={(e) => {
              userSignup(signupData, setSignupData),
                e.preventDefault()
            }}
          >
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              type="text"
              placeholder="Name"
              value={signupData.username}
            />
            <Components.Input
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              value={signupData.email}
            />
            <Components.Input
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              value={signupData.password}
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form
            onSubmit={(e) => {
              userSignin(loginData, setLoginData), e.preventDefault()
            }}
          >
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              value={loginData.email}
            />
            <Components.Input
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              value={loginData.password}
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button type="submit">Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  )
}
