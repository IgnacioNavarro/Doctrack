import FloatingApp from "./FloatingAppEnterprise";
import NavBarApp from "./NavBarAppEnterprise";
import SideBarApp from "./SideBarAppEnterprise";
import React, { useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3/dist/web3.min.js";
import { InitUserContract, addUser, getUser } from "../Web3/UserRegistration";
import Dashboard from "./DashboardEnterprise";
import { getEnterprise } from "../Web3/EnterpriseRegistration";
import { useEffect } from "react";

export default function DocTrack() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [currentTab, setCurrentTab] = useState("welcome");
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  //comprobar esta funcion
  function checkIfRegistered() {
    if (!walletAddress) {
      setCurrentTab("welcome");
      return;
    }
    const enterprise = getEnterprise(walletAddress);
      enterprise.then(function (result) {
      const walletConnected = result[0].toString();
      if (
        walletConnected === "0x0000000000000000000000000000000000000000" ||
        walletConnected === "Wallet"
      ) {
        setIsRegistered(false);
        setCurrentTab("welcome");
      } else {
        setIsRegistered(true);
        setCurrentTab("dashboard");
      }
    });
  }

  useEffect(() => {
    //si cambias de cuenta, se desconecta
    checkAccountChanged();

    //funcion si te desconectas de la cuenta de metamask regarga la pagina
    checkDisconnection();

    //connectWallet(setWalletAddress, setIsConnected);

    checkIfRegistered();

    connectWallet(setWalletAddress, setIsConnected);
  }, [walletAddress, isConnected]);

  return (
    <div className="App">
      <header className="app-header">
        <NavBarApp
          logo={require("../../static/images/logowithtext.png")}
          onclickWalllet={() => connectWallet(setWalletAddress, setIsConnected)}
          userStatus={isConnected}
        />
      </header>
      <div className="app-sidebar-content">
        <div>
          <SideBarApp
            isRegistered={isRegistered}
            profilePic={"https://www.w3schools.com/howto/img_avatar.png"}
            onTabChanged={(tab) => setCurrentTab(tab)}
            currentWalletAddress={walletAddress}
          />
        </div>
        <div className="app-content">
          <FloatingApp currentTab={currentTab} walletAddress={walletAddress} setCurrentTab={setCurrentTab} />
        </div>
      </div>
    </div>
  );
}

async function requestAccount(setWalletAddress, setIsConnected) {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.log("User denied account access");
    }
  }
}

async function connectWallet(setWalletAddress, setIsConnected) {
  if (typeof window.ethereum != "undefined") {
    await requestAccount(setWalletAddress, setIsConnected);
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
}

function checkDisconnection() {
  if (window.ethereum) {
    window.ethereum.on("disconnect", async () => {
      window.location.reload();
    });
  }
}

function checkAccountChanged() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  }
}
