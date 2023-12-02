import Documents from "./DocumentsEnterprise";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMessagesFromEnterprise } from "../Web3/MessageComunication";
import DocumentsMiniature from "../DocumentsMiniature";

// <Dashbaord onDepartmentClicked="asda" asdas="asda"
// ==
// React.RenderComponent(Dashboard, {onDepartmentClicked:"asda", asdas:"asda"})
// Dashboard({
 //   onDepartment:asd"
// })

// function Dashboard(onDepartmentClicked, onDocumentClicked)
// onDeparmtneClicked = un objeto { on DepartmentClicked}
// onDocumentCli = undefined

// function Dashboard(props)
// function Dashboard(props: DashboardProps)

/**
 * interface DashboardProps {
 *  onDepartmentClicked: (departmentId: number) => void;
 *  onDocumentClicked: () => void
 * } 
 */

// <Dashboard pepe="asdas" qwe="fss" />
// props = {pepe: "asdas", qwe: "fss"}
// 

// props.onDepartmentClicked = function
// props.OnDcumentClicked = function
// props = objeto {onDepartmentClicked: "asda", asdas: "asda"}

// Objeto pepe = {a: 1, b: 2}
// const a = pepe.a
// const b = pepe.b
// SumaDeNumeros(a,b)
//
/**
 * 
 * void SumaDeNumeros(int a, int b) {}
 * 
 * SumaDeNumeros("epep","asd","asd")
 * {........zxc: "asd"}
 * const {zxc} = objectoLarguisimoasdasdsadsa;
 */

export default function Dashboard({onDepartmentClicked, onDocumentClicked}) {

    //TODO: BARRA BUSQUEDA EN EMPRESAS
    //TODO: DOCUMENTOS OVERFLOW-Y

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
        //getEnterprises(); aqui get departments
        getDocuments();
    }, [documents, userWallet]);

    return (
        <>
            {!isLoading && (
                <>
                    <div className="documents-content">
                        <div className="section-title">
                            <h1 className='section-title-text'>
                                <span className='section-title-span'>Dashboard</span>
                            </h1>
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
    )

    /* 
                            <div className="dashboard-section-list">
                            <h4 className="dashboard-section-title">My Departments</h4>
                            <div className="enterprise-section-list-item">
                                <div className="enterprise-section-list-item-image">
                                    <img className="enterprise-section-list-item-image-logo" />
                                </div>
                                <div className="enterprise-section-list-item-info">
                                    <div className="enterprise-section-list-item-info-title">
                                        <span className="enterprise-section-list-item-info-title-text">Nombre empresa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
    */

}
