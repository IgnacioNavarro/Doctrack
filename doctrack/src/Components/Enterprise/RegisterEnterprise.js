import { useState } from "react";
import { getUser } from "../Web3/UserRegistration";
import { getEnterprise, addEnterprise, updateMinimumLevel } from "../Web3/EnterpriseRegistration";
import Dashboard from "./DashboardEnterprise";

export default function Register(registerState) {

    //level 0
    //level 2
    const [wallet, setWallet] = useState("");
    //level 1
    const [name, setName] = useState("");
    const [businessName, setBusinesName] = useState("");
    const [fiscalNumber, setFiscalNumber] = useState("");
    const [minimumLevel, setMinimumLevel] = useState("0");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [error, setError] = useState("");

    const [registerDone, setRegisterDone] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateEnterprise(name, businessName, fiscalNumber, minimumLevel, phone, mail, country, region, postalcode, city, street)) {

            UserDoesExists(wallet).then(function (result) {
                if (result) {
            console.log("Register success");
            //add enterprise and then update
            addEnterprise(wallet, name, businessName, fiscalNumber, phone, mail, country, region, postalcode, city, street).then(() => {
                updateMinimumLevel(wallet, minimumLevel).then(() => {
                    setRegisterDone(true);
                    window.location.reload();
                });
            });
        }});

            //go to dashboard
        }


    }

    async function UserDoesExists(wallet) {


        return getUser(wallet).then(function (user) {
            console.log("wallet", user[0]);
            if (user[0] === "0x0000000000000000000000000000000000000000") {
                return getEnterprise(wallet).then(function (enterprise) {
                    if (enterprise[0] === "0x0000000000000000000000000000000000000000") {

                        document.getElementById("wallet").className = "profile-info-input profile-info-content";
                        setError("");
                        return true;
                    } else {
                        document.getElementById("wallet").className = "profile-info-input profile-info-content error";
                        setError("Wallet already exists");
                        return false;
                    }});
            } else {
                document.getElementById("wallet").className = "profile-info-input profile-info-content error";
                setError("Wallet already exists");
                console.log("Wallet already exists");
                return false;
            }

        });

    }

    function validateEnterprise(name, businessName, fiscalNumber, minimumLevel, phone, mail, country, region, postalcode, city, street) {
        if (name === "" || businessName === "" || fiscalNumber === "" || minimumLevel === "" ||
            phone === "" || mail === "" || country === "" || region === "" || postalcode === "" || city === "" || street === "") {
            setError("Please fill all the fields.");
            document.getElementById("wallet").className = "profile-info-input profile-info-content input-error";
            document.getElementById("name").className = "profile-info-input profile-info-content input-error";
            document.getElementById("businessName").className = "profile-info-input profile-info-content input-error";
            document.getElementById("fiscalNumber").className = "profile-info-input profile-info-content input-error";
            document.getElementById("phone").className = "profile-info-input profile-info-content input-error";
            document.getElementById("mail").className = "profile-info-input profile-info-content input-error";
            document.getElementById("country").className = "profile-info-input profile-info-content input-error";
            document.getElementById("region").className = "profile-info-input profile-info-content input-error";
            document.getElementById("postalcode").className = "profile-info-input profile-info-content input-error";
            document.getElementById("city").className = "profile-info-input profile-info-content input-error";
            document.getElementById("street").className = "profile-info-input profile-info-content input-error";
            return false;
        }
        return true;


    }



    if (registerDone) {
        return <Dashboard />;
    }
    //todo function to go back to welcome page
    return (
        <div className="welcome-content">
            <p className="welcome-user-text"> Enterprise Registration</p>
            <form>
                <div className="profile-info-registration">
                    <div className="profile-info-level">
                        <span className="level-section"> 2 </span>
                        <div className="profile-info-section">
                            <div className="profile-info-wallet profile-info-name">

                                <span className="profile-info-text"> Wallet </span>

                                <input type="text" className="profile-info-input profile-info-content" id="wallet"
                                    value={wallet} onChange={(e) => setWallet(e.target.value)}
                                    placeholder="0x161f3211e2e38c2E3E99F9D12d87933bD2001171" />
                            </div>
                            <div className="profile-info-name">
                                <span className="profile-info-text"> Name </span>

                                <input type="text" className="profile-info-input profile-info-content" id="name" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Company Name" />

                            </div>
                            <div className="profile-info-surname profile-info-name">
                                <span className="profile-info-text"> Business Name </span>

                                <input type="text" className="profile-info-input profile-info-content" id="businessName"
                                    value={businessName} onChange={(e) => setBusinesName(e.target.value)}
                                    placeholder="Limited society" />
                            </div>
                            <div className="profile-info-id">
                                <span className="profile-info-text"> Fiscal Number </span>

                                <input type="text" className="profile-info-input profile-info-content" id="fiscalNumber"
                                    value={fiscalNumber} onChange={(e) => setFiscalNumber(e.target.value)}
                                    placeholder="Identity Card Number" />
                            </div>
                            <div className="profile-info-phone">
                                <span className="profile-info-text"> Phone </span>

                                <input type="text" className="profile-info-input profile-info-content" id="phone" value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+34 634546721" />
                            </div>
                            <div className="profile-info-mail">
                                <span className="profile-info-text"> Mail </span>

                                <input type="text" className="profile-info-input profile-info-content" id="mail"
                                    value={mail} onChange={(e) => setMail(e.target.value)}
                                    placeholder="mail@mail.com" />
                            </div>
                            <div className="profile-info-country">
                                <span className="profile-info-text"> Country </span>

                                <input type="text" className="profile-info-input profile-info-content" id="country"
                                    value={country} onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Spain" />
                            </div>
                            <div className="profile-info-region">
                                <span className="profile-info-text"> Region </span>

                                <input type="text" className="profile-info-input profile-info-content" id="region"
                                    value={region} onChange={(e) => setRegion(e.target.value)}
                                    placeholder="Andalucía" />
                            </div>
                            <div className="profile-info-postalcode">
                                <span className="profile-info-text"> Postal Code </span>

                                <input type="text" className="profile-info-input profile-info-content" id="postalcode"
                                    value={postalcode} onChange={(e) => setPostalcode(e.target.value)}
                                    placeholder="41012" />
                            </div>
                            <div className="profile-info-city">
                                <span className="profile-info-text"> City </span>

                                <input type="text" className="profile-info-input profile-info-content" id="city"
                                    value={city} onChange={(e) => setCity(e.target.value)}
                                    placeholder="Sevilla" />
                            </div>
                            <div className="profile-info-street profile-info-name">
                                <span className="profile-info-text"> Street </span>

                                <input type="text" className="profile-info-input profile-info-content" id="street"
                                    value={street} onChange={(e) => setStreet(e.target.value)}
                                    placeholder="Avenida Reina Mercedes 5" />
                            </div>
                            <div className="profile-info-min-level">
                                <span className="profile-info-text"> Minimum Level </span>
                                <select className="profile-info-input profile-info-content" id="min-level"
                                    onChange={(e) => {
                                        setMinimumLevel(e.target.value);
                                        console.log(e.target.value);
                                    }}>
                                    <option value="0">Level 0 (wallet)</option>
                                    <option value="1">Level 1 (Level 0, name, surname)</option>
                                    <option value="2">2 (All data)</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="registration-error-section">
                        <span className="registration-error-text"> {error} </span>
                    </div>
                    <input type="submit" value="Submit" onClick={handleSubmit} className="register-user-button" />
                </div>

            </form>

        </div>
    )

}

