import { useState } from "react";
import DocumentsMiniature from "../DocumentsMiniature";
import { useEffect } from "react";
import { getAllMessagesFromEnterprise } from "../Web3/MessageComunication";

export default function Documents({onDocumentClicked}) {

    //TODO: 4 DOCS POR LINEA

    const [isLoading, setIsLoading] = useState(true);
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

    function getDocuments() {
        getAllMessagesFromEnterprise(userWallet).then(function (result) {
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


    useEffect(() => {
        requestAccount();
        getDocuments();
    }, [documents, userWallet]);

    return (
        <div className="documents-content">
            <div className="section-title">
                <h1 className="section-title-text">
                    <span className="section-title-span">Documents</span>
                </h1>
            </div>
            <div className="documents-section-list">
                {!isLoading && (
                    <>
                        {documents.map((document) => (
                            <DocumentsMiniature
                                key={document.id}
                                document={document}
                                onClicked={onDocumentClicked}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );

}

