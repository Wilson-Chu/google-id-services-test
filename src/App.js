import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("JWT token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt(); // Google One Tap Dialogue
  }, []);

  // If we have no user: show the sign in button
  // If we have a user: show the log out button
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && ( // If user signed in
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
