import Documents from "./Documents";
import React from "react";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Profile from "./Profile";
import Welcome from "./Welcome";
import Register from "./Register";
import Enterprises from "./Enterprises";
import EnterpriseDetailed from "./EnterpriseDetailed";
import DocumentDetailed from "./DocumentDetailed";
import { useState } from "react";

export default function FloatingApp({
  currentTab,
  setCurrentTab,
  walletAddress,
}) {
  const [enterprise, setEnterprise] = useState(null);
  const [document, setDocument] = useState(null);

  function onEnterpriseClicked(enterprise) {
    console.log(enterprise);
    setEnterprise(enterprise);
    setCurrentTab("enterprise");
  }

  function onDocumentClicked(document) {
    console.log(document);
    setDocument(document);
    setCurrentTab("document");
  }

  function chooseTab(tab, walletAddress) {
    switch (tab) {
      case "documents":
        return <Documents onDocumentClicked={onDocumentClicked} />;
      //case "transactions":
      //  return <Transactions />;
      case "profile":
        return <Profile wallet={walletAddress} />;
      case "dashboard":
        return (
          <Dashboard
            onEnterpriseClicked={onEnterpriseClicked}
            onDocumentClicked={onDocumentClicked}
          />
        );
      case "welcome":
        return <Welcome />;
      case "register":
        return <Register />;
      case "enterprises":
        return <Enterprises onEnterpriseClicked={onEnterpriseClicked} />;
      case "enterprise":
        return <EnterpriseDetailed enterprise={enterprise} />;
      case "document":
        return <DocumentDetailed document={document} />;
      default:
        return <Dashboard onEnterpriseClicked={onEnterpriseClicked} />;
    }
  }

  return (
    <div className="floating-app">
      <div className="floating-app-content" id="floating-app-content">
        {chooseTab(currentTab, walletAddress)}
      </div>
    </div>
  );
}
