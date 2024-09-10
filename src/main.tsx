import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthFrame from './AuthFrame.tsx'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from 'react-oidc-context'
// import { User } from "oidc-client-ts";
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';


export const userManager = new UserManager({
  authority: "http://localhost:8080/realms/other",
  client_id: "metamorphic",
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true // this allows cross tab login/logout detection
});

console.log("*** 1", userManager.settings)

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};


// const oidcConfig = {
//   authority: "http://localhost:8080/realms/master",
//   client_id: "myclient",
//   redirect_uri: "http://localhost:4000/",
//   onSigninCallback
// }



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
      <AuthFrame>
        <App />        
      </AuthFrame>
    </AuthProvider>
  </StrictMode>
)
