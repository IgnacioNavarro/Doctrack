import { useState } from "react";
import { getUser } from "./Web3/UserRegistration";
import { useEffect } from "react";
import { ethers } from "ethers";
import { writeMessage } from "./Web3/MessageComunication";
import ipfs from './Web3/ipfs';
import { Buffer } from 'buffer';

export default function DocumentDelivery(enterprise) {

    //handle click on form submit



    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [userWallet, setUserWallet] = useState("");
    const [userLevel, setUserLevel] = useState(0);
    const [minLevel, setMinLevel] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [buffer, setBuffer] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");


    useEffect(() => {
        requestAccount();
        setMinLevel(enterprise.enterprise.minimumLevel);
    }, []);

    //WEB 3 FUNCTIONS
    async function requestAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setUserWallet(accounts[0]);
                getUserLevel(accounts[0]);
            } catch (error) {
                console.log("User denied account access");
            }
        }
    }


    function getUserLevel(userWallet) {
        getUser(userWallet).then(function (user) {
            console.log(user);
            if (user.wallet !== "") {
                setUserLevel(0);
                setIsLoading(false);
            }

            if (user.wallet !== "" && user.name !== "" && user.surname !== "") {

                setUserLevel(1);
                setIsLoading(false);
            }

            if (user.wallet !== "" && user.name !== "" && user.surname !== "" && user.id !== "" && user.phone !== ""
                && user.email !== "" && user.country !== "" && user.region !== "" && user.postalcode !== "" && user.city !== "") {
                setUserLevel(2);
                console.log("hola");
                setIsLoading(false);
            }


            console.log(isLoading);
        }
        );

    }


    //VALIDATIONS
    function validateForm(subject, content) {
        if (subject.length === 0) {
            setError("Please, fill all the data.");
            document.getElementById("subject").className = "delivery-content-subject-value input-error";
            document.getElementById("content").className = "delivery-content-description-value";
            return false;
        }
        if (content.length === 0) {
            setError("Please, fill all the data.");
            document.getElementById("subject").className = "delivery-content-subject-value";
            document.getElementById("content").className = "delivery-content-description-value input-error";
            return false;
        }
        return true;
    }

    function validateMinLevel(userLevel, minLevel) {
        if (userLevel < minLevel) {
            setError("You don't have the minimum level to send documents to this enterprise. Your level: " + userLevel + " Minimum level: " + minLevel);
            return false;
        }
        return true;
    }

    function validateFile() {
        if (buffer === null) {
            setError("Please, select a file.");
            return false;
        }
        return true;
    }



    //SUBMIT FORM
    function handleSubmit(event) {
        event.preventDefault();

        if (validateForm(subject, content) && validateMinLevel(userLevel, minLevel) && validateFile()) {
            setError("");
            console.log("Sending document...");
            console.log(ipfs.add(buffer));
            ipfs.add(buffer).then(({ path }) => {
                console.log("path", path); 
                setIpfsHash(path)
                console.log("ipfsHash", ipfsHash);
                writeMessage(userWallet, enterprise.enterprise.wallet, subject, content, path).then(function (tx) {
                    window.location.reload();
                }
                );
                console.log("Document sent.");
                console.log("Subject: " + subject);
                console.log("Content: " + content);
                console.log("IPFS hash: " + path);

            }).catch((err) => {
                console.error(err);
            });

        }
    }



    const captureDocument = (event) => {
        event.preventDefault();
        console.log("Changing image...");
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            console.log("buffer: ", reader.result);
            let buff = Buffer.from(reader.result);
            //Aqui hay que instalar una libreria de buffer porque no es compatible con webpack 5
            console.log("buff: ", buff);
            setBuffer(buff);
        }
    }



    return (

        <>
            {!isLoading && (
                <>
                    <form>
                        <div className="documents-content">
                            <div className="section-title">
                                <h1 className='section-title-text'>
                                    <span className='section-title-span'>Document Delivery</span>
                                </h1>
                            </div>
                            <div className="delivery-content">
                                <div className="delivery-content-to">
                                    <div className="delivery-content-to-title">
                                        <span className="delivery-content-to-title-text">To:</span>
                                        <span className="delivery-content-to-title-value">{enterprise.enterprise.name}</span>
                                    </div>

                                </div>
                                <div className="delivery-content-subject">
                                    <div className="delivery-content-subject-title">
                                        <span className="delivery-content-subject-title-text">Subject:</span>
                                    </div>
                                    <input className="delivery-content-subject-value" type="text" placeholder="Subject"
                                        id="subject"
                                        onChange={(e) => setSubject(e.target.value)} />
                                </div>
                                <div className="delivery-content-description">
                                    <div className="delivery-content-description-title">
                                        <span className="delivery-content-description-title-text">Content:</span>
                                    </div>
                                    <textarea className="delivery-content-description-value" type="text" placeholder="Content" rows={10}
                                        id="content"
                                        onChange={(e) => setContent(e.target.value)} />
                                </div>
                                <div className="delivery-content-file">
                                    <input className="delivery-content-file-input" type="file" onChange={captureDocument} />
                                </div>
                                <div className="delivery-error-section">
                                    <span className="registration-error-text"> {error} </span>
                                </div>

                                <div className="delivery-content-send">
                                    <button className="delivery-content-send-button" onClick={handleSubmit}>Send Document
                                    </button>
                                </div>

                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}