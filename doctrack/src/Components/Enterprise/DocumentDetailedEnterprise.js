import { useEffect } from "react";
import { useState } from "react";
import DocumentStateTable from "../DocumentStateTable";
import { getEnterprise } from "../Web3/EnterpriseRegistration";
import { getUser } from "../Web3/UserRegistration";
import { setConfirmed, setDownloaded, setRejected } from "../Web3/MessageComunication";

export default function DocumentDetailed({ document }) {


  const [enterpriseName, setEnterpriseName] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [departmentName, setDeparmentName] = useState('');
  const [sharedWithText, setSharedWithText] = useState('');
  const [messageConfirmed, setMessageConfirmed] = useState(false);


  function getEnterpriseName(wallet) {
    getEnterprise(wallet).then(function (result) {
      setEnterpriseName(result.name);
    }
    );
  }

  function getUserName(wallet) {
    getUser(wallet).then(function (result) {
      setUserName(result.name);
      setUserSurname(result.surname);
      console.log(result);
    }
    );
  }


  function clickToConfirm() {
    if(document.rejected || document.confirmed){
      console.log("already confirmed or rejected");
        return;
    }else{
        setConfirmed(document.id).then(function (result) {
          window.location.reload();
        }
        );
    }
}

function clickToReject() {
    if(document.confirmed || document.rejected) {
        console.log("already confirmed or rejected");
        return;
    }else{
        setRejected(document.id).then(function (result) {
          window.location.reload();
    }
    );
  }
}



  function handleDownload() {
    setDownloaded(document.id).then(function (result) {
      const url = "https://doctrack.infura-ipfs.io/ipfs/" + document.documenthash;
      window.open(url);
    }
    );
  }

  function sharedWith() {
    let user = userName;
    let enterprise = enterpriseName;
    let department = departmentName;
    let sharedWith = "";
    //let department = document.department;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        sharedWith += user;
      } else if (i === 1) {
        sharedWith += ", " + enterprise;
      }
      else if (department !== "") {
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
          Download File
        </button>
        <button className="document-detailed-content-file-button confirm-file-button" onClick={() => clickToConfirm()}> Confirm file </button>
        <button className="document-detailed-content-file-button reject-file-button" onClick={() => clickToReject()}> Reject file </button>
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
