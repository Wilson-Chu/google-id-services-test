import "./App.css";
import { useEffect, useState } from "react";

function App() {
  function handleCallbackResponse(response) {
    console.log("JWT token: " + response.credential);
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
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
