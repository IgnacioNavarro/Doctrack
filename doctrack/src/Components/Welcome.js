import { useState } from "react";
import Register from "./Register";

export default function Welcome(){

  const [registerState, setRegisterState] = useState(false);


  function handleRegister(){
    setRegisterState(true);
    console.log("registerState: " + registerState);
  }


  if(registerState){
      return <Register registerState= {(state) => setRegisterState(state)}/>;
    }


    return (
        <div className="welcome-content">
            <p className="welcome-user-text"> Welcome to DocTrack dApp!</p>
            <p className="welcome-user-text2"> This is the users portal.</p>
            <p className="welcome-user-text2"> Please, register to use the dApp.</p>
            <p className="welcome-user-text2 registration-error-text">Connect to polygon mumbai to use the app</p>
            <div className="welcome-user-buttons">
                <button className="register-user-button" onClick={() => handleRegister()}>Register</button>
            </div>
            <p className="welcome-user-text4"> Already have an account? click on connect wallet button on the right corner.</p>
            <div className="welcome-user-redirect">
                <a href="/enterprise">Want to connect as an enterprise? Go to Enterprise portal.</a><br/>

            </div>
        </div>
    )

    //                <a href="/department">Want to connect as a deparment? Go to Department portal.</a>

} 

