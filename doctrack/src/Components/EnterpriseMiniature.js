import EnterpriseDetailed from "./EnterpriseDetailed";
import { useEffect, useState } from "react";

export default function EnterpriseMiniature({enterprise, onEnterpriseClicked}) {


    //HANDLE CLICK ON ENTERPRISE
    const [image, setImage] = useState("");

    useEffect(() => {
        setImage(`https://doctrack.infura-ipfs.io/ipfs/${enterprise.imageHash}`)
    }, [enterprise]);

    function handleEnterpriseClick() {

        if (onEnterpriseClicked)
            onEnterpriseClicked(enterprise);
    }



    return (
        <div className="enterprise-section-list-item" onClick={() => handleEnterpriseClick()}>
            <div className="enterprise-section-list-item-image">
                <img className="enterprise-section-list-item-image-logo" src={image} alt="profile-icon" />
            </div>
            <div className="enterprise-section-list-item-info">
                <div className="enterprise-section-list-item-info-title">
                    <span className="enterprise-section-list-item-info-title-text">{enterprise.name}</span>
                </div>
            </div>
        </div>
    );
}