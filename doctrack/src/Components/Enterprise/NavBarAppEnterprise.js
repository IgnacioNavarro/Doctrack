import { useState } from "react";

export default function NavBarApp({logo, onclickWalllet, userStatus}) {

    function userConnection(){
        if(userStatus){
            return(
                <div className="navbar-user-status">
                    <div id="navbar-user-status-icon"/>
                    <span>Connected</span>
                </div>
            )
        }else{
            return(
                <button className="navbar-app-connect"
                 onClick={onclickWalllet}>
                     Connect wallet
                </button>
            )
        }
    }

    return (
        <div className="navbar-app">
            <img className="navbar-app-logo" src={logo}/>
            <div className="navbar-app-right">
                {userConnection()}
            </div>
        </div>
        
    );
}




