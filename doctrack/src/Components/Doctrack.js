import FloatingApp from "./FloatingApp";
import NavBarApp from "./NavBarApp";
import SideBarApp from "./SideBarApp";
import React, { useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3/dist/web3.min.js";
import { InitUserContract, addUser, getUser } from "./Web3/UserRegistration";
import Dashboard from "./Dashboard";
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
    const user = getUser(walletAddress);
    user.then(function (result) {
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
    addPolygonMumbaiNetwork();

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
          logo={require("../static/images/logowithtext.png")}
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
    await addPolygonMumbaiNetwork();
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
}


async function addPolygonMumbaiNetwork() {
  console.log("addPolygonMumbaiNetwork");
  try {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
          chainId: '0x13881',
          chainName: 'Mumbai',
          nativeCurrency: {
              name: 'Matic',
              symbol: 'MATIC',
              decimals: 18
          },
          rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
          blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }]
  })

  } catch (error) {
      console.log("User denied network access");
  }
}


async function switchToPolygonMumbaiNetwork() {
  console.log("switchToPolygonMumbaiNetwork");
  window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
          chainId: '80001'
      }]
  })
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
