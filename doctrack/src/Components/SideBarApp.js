import { useEffect } from "react";
import SideButton from "./SideButton";
import { getUser } from "./Web3/UserRegistration";
import { useState } from "react";

function displayWallet(walletAddress) {
  var myWallet = walletAddress;
  var shortenedWallet = "";
  if (!myWallet) {
    return "Sin Cartera";
  } else {
    var firstsDigits = myWallet.substring(0, 6);
    var lastsDigits = myWallet.substring(myWallet.length - 4, myWallet.length);
    shortenedWallet = firstsDigits + "..." + lastsDigits;
  }
  return shortenedWallet;
}

export default function SidebarApp({
  profilePic,
  onTabChanged,
  currentWalletAddress,
  isRegistered,
}) {

  const [name, setName] = useState("No name");
  const [ipfsHash, setIpfsHash] = useState("");

  function loadName(wallet) {
    getUser(wallet).then(function (user) {
      setName(user.name);
      setIpfsHash(user.imageHash);
    });
  }

  useEffect(() => {
    loadName(currentWalletAddress);
  });
    
  return (
    <div className="sidebar-app">
      <div className="sidebar-app-profile">
        <img
          src={`https://doctrack.infura-ipfs.io/ipfs/${ipfsHash}`}
          alt="profile"
          className="sidebar-app-profile-picture"
        />
      </div>
      <div className="sidebar-app-profile-text">
        <span className="sidebar-app-profile-name"> {name} </span>
        <br />
        <span className="sidebar-app-profile-wallet">
          {" "}
          {displayWallet(currentWalletAddress)}{" "}
        </span>
      </div>
      {isRegistered && (
        <div className="sidebar-app-buttons">
          <SideButton
            buttonText="Dashboard"
            buttonIcon="dashboard-icon"
            buttonId="dashboard-button"
            buttonClass="side-button"
            buttonClick={() => dashboardClicked(onTabChanged)}
          />
          <SideButton
            buttonText="Profile"
            buttonIcon="profile-icon"
            buttonId="profile-button"
            buttonClass="side-button"
            buttonClick={() => profileClicked(onTabChanged)}
          />

          <SideButton
            buttonText="Documents"
            buttonIcon="document-icon"
            buttonId="documents-button"
            buttonClass="side-button"
            buttonClick={() => documentsClicked(onTabChanged)}
          />
          <SideButton
            buttonText="Enterprises"
            buttonIcon="enterprise-icon"
            buttonId="enterprise-button"
            buttonClass="side-button"
            buttonClick={() => enterprisesClicked(onTabChanged)}
          />
        </div>
      )}
    </div>
  );
}

function dashboardClicked(onTabChanged) {
  onTabChanged("dashboard");
  document.getElementById("dashboard-button").className =
    "side-button-selected";
  document.getElementById("profile-button").className = "side-button";
  //document.getElementById("transaction-button").className = "side-button";
  document.getElementById("documents-button").className = "side-button";
  document.getElementById("enterprise-button").className = "side-button";
}

function profileClicked(onTabChanged) {
  onTabChanged("profile");
  document.getElementById("dashboard-button").className = "side-button";
  document.getElementById("profile-button").className = "side-button-selected";
  //document.getElementById("transaction-button").className = "side-button";
  document.getElementById("documents-button").className = "side-button";
  document.getElementById("enterprise-button").className = "side-button";
}

function transactionsClicked(onTabChanged) {
  onTabChanged("transactions");
  document.getElementById("dashboard-button").className = "side-button";
  document.getElementById("profile-button").className = "side-button";
  //document.getElementById("transaction-button").className =
  //  "side-button-selected";
  document.getElementById("documents-button").className = "side-button";
  document.getElementById("enterprise-button").className = "side-button";
}

function documentsClicked(onTabChanged) {
  onTabChanged("documents");
  document.getElementById("dashboard-button").className = "side-button";
  document.getElementById("profile-button").className = "side-button";
  //document.getElementById("transaction-button").className = "side-button";
  document.getElementById("documents-button").className =
    "side-button-selected";
    document.getElementById("enterprise-button").className = "side-button";
}

function enterprisesClicked(onTabChanged) {
  onTabChanged("enterprises");
  document.getElementById("dashboard-button").className = "side-button";
  document.getElementById("profile-button").className = "side-button";
  //document.getElementById("transaction-button").className = "side-button";
  document.getElementById("documents-button").className = "side-button";
  document.getElementById("enterprise-button").className = "side-button-selected";
}
