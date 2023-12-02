import { useEffect, useState } from "react";
import DocumentDelivery from "./DocumentDelivery";

export default function EnterpriseDetailed({enterprise}) {

    const [moreInfo, setMoreInfo] = useState(false);
    const [sendDoc, setSendDoc] = useState(false);
    const [docImage, setDocImage] = useState("");

    useEffect(() => {
        setDocImage(`https://doctrack.infura-ipfs.io/ipfs/${enterprise.imageHash}`);
    }, [enterprise]);



    function handleMoreInfoClick() {
        setMoreInfo(!moreInfo);
        if (moreInfo) {
            document.getElementById("hidden").style.display = "block";
            document.getElementById("moreInfo").innerHTML = "Click to see less information";
            document.getElementById("arrow-bottom").style.transform = "rotate(90deg)";
        } else {
            document.getElementById("hidden").style.display = "none";
            document.getElementById("moreInfo").innerHTML = "Click to see more information";
            document.getElementById("arrow-bottom").style.transform = "rotate(0deg)";
        }
    }


    function handleSendDoc(){
        setSendDoc(true);
    }

    if(sendDoc){
        return <DocumentDelivery enterprise={enterprise} />
    }




    return (
        <div className="enterprise-detailed-content">
            <div className="enterprise-detailed-content-header">
                <div className="enterprise-detailed-content-header-image">
                    <img className="enterprise-detailed-content-header-image-logo" src={docImage} alt="profile" />

                </div>
                <div className="enterprise-detailed-content-header-info">
                    <div className="enterprise-detailed-content-header-info-title">
                        <span className="enterprise-detailed-content-header-info-title-text">{enterprise.name}</span>
                    </div>
                    <div className="enterprise-detailed-content-header-info-minlevel">
                        <span className="enterprise-detailed-content-header-info-minlevel-text">Minimum Level:</span>
                        <span className="enterprise-detailed-content-header-info-minlevel-value">{enterprise.minimumLevel}</span>
                    </div>
                    <div className="enterprise-detailed-content-header-info-mail">
                        <span className="enterprise-detailed-content-header-info-mail-text">
                            Mail:
                        </span>
                        <span className="enterprise-detailed-content-header-info-mail-value">{enterprise.email}</span>
                    </div>

                    <div className="enterprise-detailed-content-header-info-wallet">
                        <span className="enterprise-detailed-content-header-info-wallet-text">
                            Wallet:
                        </span>
                        <span className="enterprise-detailed-content-header-info-wallet-value">
                            {enterprise.wallet}
                        </span>
                    </div>

                    <div className="enterprise-detailed-content-body" onClick={() => handleMoreInfoClick()}>
                        <div className="enterprise-detailed-content-body-moreinfo">
                            <span className="enterprise-detailed-content-body-moreinfo-text" id="moreInfo">
                                Click to see more information
                            </span>
                            <img className="enterprise-detailed-content-body-moreinfo-arrow" id="arrow-bottom" />
                        </div>
                        <div className="enterprise-detailed-content-body-hidden" id="hidden">
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-businessName-title-text">Business Name:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-businessName-value-text">
                                        {enterprise.businessName}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-fiscalNumber-title-text">Fiscal Number:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-fiscalNumber-value-text">
                                        {enterprise.fiscalNumber}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-phone-title-text">Phone:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-phone-value-text">
                                        {enterprise.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-country-title-text">Country:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-country-value-text">
                                        {enterprise.country}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-region-title-text">Region:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-region-value-text">
                                        {enterprise.region}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-postalCode-title-text">Postal Code:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-postalCode-value-text">
                                        {enterprise.postalCode}
                                    </span>
                                </div>
                            </div>
                            <div className="enterprise-detailed-content-body-hidden-section">
                                <div className="enterprise-detailed-content-body-hidden-title">
                                    <span className="enterprise-detailed-content-body-hidden-street-title-text">Street:</span>
                                </div>
                                <div className="enterprise-detailed-content-body-hidden-value">
                                    <span className="enterprise-detailed-content-body-hidden-street-value-text">
                                        {enterprise.street}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="enterprise-detailed-content-send">
                <button className="enterprise-detailed-content-send-button" onClick={() => handleSendDoc()}>Send Documents
                    </button>
            </div>

        </div>
    )
}
