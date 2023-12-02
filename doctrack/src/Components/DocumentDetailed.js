import { useEffect } from "react";
import { useState } from "react";
import { getEnterprise } from "./Web3/EnterpriseRegistration";
import { getUser } from "./Web3/UserRegistration";
import DocumentStateTable from "./DocumentStateTable";


export default function DocumentDetailed({ document }) {
  

  const[enterpriseName, setEnterpriseName] = useState('');
  const[userName, setUserName] = useState('');
  const[departmentName, setDeparmentName] = useState('');
  const[sharedWithText, setSharedWithText] = useState('');


  function getEnterpriseName(wallet) {
    getEnterprise(wallet).then(function (result) {
      setEnterpriseName(result.name);
    }
    );
  }

  function getUserName(wallet) {
    getUser(wallet).then(function (result) {
      setUserName(result.name);
    }
    );
  }


  function handleDownload() {
    const url = "https://doctrack.infura-ipfs.io/ipfs/" + document.documenthash;
    window.open(url);
  }

  function sharedWith() {
    let user  = userName;
    let enterprise = enterpriseName;
    let department = departmentName;
    let sharedWith = "";
    //let department = document.department;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        sharedWith += user;
      } else if (i === 1) {
        sharedWith += ", " +  enterprise;
      }
      else if(department !== ""){
        sharedWith += ", " + department;
      }

    }
    sharedWith += ".";
    setSharedWithText(sharedWith);
  }

  

  useEffect(() => {
    getEnterpriseName(document.enterprise);
    getUserName(document.user);
    sharedWith();
  }, [enterpriseName, userName, departmentName]);
  
  return (
    <div className="document-detailed-content">
      <div className="document-detailed-content-title">
        <span className="document-detailed-content-title-text">
        {document.subject}
        </span>
      </div>
      <div className="document-detailed-content-subject">
        <span className="document-detailed-content-subject-text">To:</span>
        <span className="document-detailed-content-subject-value">
          {enterpriseName}
        </span>
      </div>
      <div className="document-detailed-content-description">
        <span className="document-detailed-content-description-text">
          Content:
        </span>
        <br />
        <span className="document-detailed-content-description-value">
          {document.content}
        </span>
      </div>
      <div className="document-detailed-content-file">
        <button className="document-detailed-content-file-button" onClick={() => handleDownload()}>
          Download
        </button>
      </div>
      <DocumentStateTable file={document} />
      <div className="document-detailed-content-shared">
        <span className="document-detailed-content-shared-text">Shared with:</span>
        <div className="document-detailed-content-shared-list">
          {sharedWithText}
        </div>
      </div>
    </div>
  );
}
