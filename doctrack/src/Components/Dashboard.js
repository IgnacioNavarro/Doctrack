import { useEffect } from "react";
import EnterpriseMiniature from "./EnterpriseMiniature";
import { getAllEnterprises } from "./Web3/EnterpriseRegistration";
import { useState } from "react";
import DocumentsMiniature from "./DocumentsMiniature";
import { getAllMessagesFromUser } from "./Web3/MessageComunication";

export default function Dashboard({ onEnterpriseClicked, onDocumentClicked }) {
  //TODO: BARRA BUSQUEDA EN EMPRESAS
  //TODO: DOCUMENTOS OVERFLOW-Y

  //const [enterprise, setEnterprise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enterprises, setEnterprises] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [userWallet, setUserWallet] = useState("");

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserWallet(accounts[0]);
      } catch (error) {
        console.log("User denied account access");
      }
    }
  }

  function getDocuments(){
    getAllMessagesFromUser(userWallet).then(function (result) {
      //result es un array de empresas
      /*return a Enterprise miniature with the first element of the array*/
      //console.log(result);
      //console.log(result[0]);
      //return result[0];
      let documentList = [];
      //return <EnterpriseMiniature enterprise={result[0]} />
      for (let i = 0; i < result.length; i++) {
        documentList.push(result[i]);
        //console.log(result[i].name);
        //<EnterpriseMiniature enterprise={result[i]} />
      }
      setDocuments(documentList);
      setIsLoading(false);
    });
  }

  function getEnterprises() {
    getAllEnterprises().then(function (result) {
      //result es un array de empresas
      /*return a Enterprise miniature with the first element of the array*/
      //console.log(result);
      //console.log(result[0]);
      //return result[0];
      let enterpriseList = [];
      //return <EnterpriseMiniature enterprise={result[0]} />
      for (let i = 0; i < result.length; i++) {
        enterpriseList.push(result[i]);
        //console.log(result[i].name);
        //<EnterpriseMiniature enterprise={result[i]} />
      }
      setEnterprises(enterpriseList);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    requestAccount();
    getEnterprises();
    getDocuments();
  }, [documents, enterprises, userWallet]);

  function onPlaceholderDocumentClicked() {
    //onDocumentClicked({ name: "aasdas", subject: "placeholder" });
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="documents-content">
            <div className="section-title">
              <h1 className="section-title-text">
                <span className="section-title-span">Dashboard</span>
              </h1>
            </div>
            <div className="dashboard-section-list">
              <h4 className="dashboard-section-title">
                Recommended Enterprises
              </h4>
              <div className="enterprise-section-list">
                {enterprises.map((enterprise) => {
                  return (
                    <EnterpriseMiniature
                      key={enterprise.wallet}
                      enterprise={enterprise}
                      onEnterpriseClicked={onEnterpriseClicked}
                    />
                  );
                })}
              </div>
            </div>
            <div className="dashboard-section-list">
              <h4 className="dashboard-section-title">Recommended Documents</h4>
              <div className="documents-section-list">
                {documents.map((document) => (
                  <DocumentsMiniature
                    key={document.id}
                    document={document}
                    onClicked={onDocumentClicked}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
