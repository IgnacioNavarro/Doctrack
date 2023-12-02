import { useEffect, useState } from "react";
import { getUser, addUser } from "./Web3/UserRegistration";
import { getEnterprise } from "./Web3/EnterpriseRegistration";
import Dashboard from "./Dashboard";

export default function Register(registerState) {

    const [getWallet, setGetWallet] = useState(null);
    //level 0
    const [wallet, setWallet] = useState("");
    //level 1
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    //level 2
    const [id, setId] = useState("");
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


        if (validateLevel0(wallet) &&
            validateLevel1(name, surname) &&
            validateLevel2(id, phone, mail, country, region, postalcode, city, street)) {
            if (UserDoesExists(wallet).then(function (result) {

                if (result === true) {
                    console.log("Register success");
                    addUser(wallet, name, surname, id, phone, mail, country, region, postalcode, city, street).then(() => {
                        setRegisterDone(true);
                        window.location.reload();
                    });

                }
            }));

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


    function validateLevel0(wallet) {
        if (wallet.length === 0) {
            document.getElementById("wallet").className = "profile-info-input profile-info-content input-error";
            setError("Wallet is required.");
            return false;
        }
        return wallet.length > 0;
    }

    function validateLevel1(name, surname) {
        if (name.length > 0 && surname.length > 0) {
            return true;
        }
        if (name.length === 0 && surname.length === 0) {
            return true;
        }
        document.getElementById("wallet").className = "profile-info-input profile-info-content";
        document.getElementById("name").className = "profile-info-input profile-info-content input-error";
        document.getElementById("surname").className = "profile-info-input profile-info-content input-error";
        setError("Fill completely the level 1, or let it completely empty.");
        return false;
    }

    function validateLevel2(id, phone, mail, country, region, postalcode, city, street) {
        if (id.length > 0 && phone.length > 0 && mail.length > 0 && country.length > 0 && region.length > 0 &&
            postalcode.length > 0 && city.length > 0 && street.length > 0) {
            return true;
        }
        if (id.length === 0 && phone.length === 0 && mail.length === 0 && country.length === 0 && region.length === 0 &&
            postalcode.length === 0 && city.length === 0 && street.length === 0) {
            return true;
        }
        document.getElementById("wallet").className = "profile-info-input profile-info-content";
        document.getElementById("name").className = "profile-info-input profile-info-content";
        document.getElementById("surname").className = "profile-info-input profile-info-content";
        document.getElementById("id").className = "profile-info-input profile-info-content input-error";
        document.getElementById("phone").className = "profile-info-input profile-info-content input-error";
        document.getElementById("mail").className = "profile-info-input profile-info-content input-error";
        document.getElementById("country").className = "profile-info-input profile-info-content input-error";
        document.getElementById("region").className = "profile-info-input profile-info-content input-error";
        document.getElementById("postalcode").className = "profile-info-input profile-info-content input-error";
        document.getElementById("city").className = "profile-info-input profile-info-content input-error";
        document.getElementById("street").className = "profile-info-input profile-info-content input-error";
        setError("Fill completely the level 2, or let it completely empty.");
        return false;
    }


    async function requestAccount(setWalletAddress) {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setGetWallet(accounts[0]);
            } catch (error) {
                console.log("User denied account access");
            }
        }
    }

    useEffect(() => {
        requestAccount(setGetWallet);
    }, []);


    if (registerDone) {
        return <Dashboard />;
    }
    //todo function to go back to welcome page
    return (
        <div className="welcome-content">
            <p className="welcome-user-text"> User Registration</p>
            <p className="welcome-user-text3"> What are the numbers on the left? Each number refer to a level.</p>
            <p className="welcome-user-text3"> What is a level? A level defines how much information are you providing to the enterprises.</p>
            <p className="welcome-user-text3"> Please fill complete unitl the level of your desire. You can register with level 0, but some enterprises will require higher level.</p>
            <form>
                <div className="profile-info-registration">
                    <div className="profile-info-level">
                        <span className="level-section"> 0 </span>
                        <div className="profile-info-section">
                            <div className="profile-info-wallet">
                                <span className="profile-info-text"> Wallet </span>
                                <input type="text" className="profile-info-input profile-info-content" id="wallet"
                                    value={wallet} onChange={(e) => setWallet(e.target.value)}
                                    placeholder="0x161f3211e2e38c2E3E99F9D12d87933bD2001171" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-level">
                        <span className="level-section"> 1 </span>
                        <div className="profile-info-section">
                            <div className="profile-info-name">
                                <span className="profile-info-text"> Name </span>

                                <input type="text" className="profile-info-input profile-info-content" id="name" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name" />

                            </div>
                            <div className="profile-info-surname">
                                <span className="profile-info-text"> Surname </span>

                                <input type="text" className="profile-info-input profile-info-content" id="surname"
                                    value={surname} onChange={(e) => setSurname(e.target.value)}
                                    placeholder="Surname" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-level">
                        <span className="level-section"> 2 </span>
                        <div className="profile-info-section">
                            <div className="profile-info-id">
                                <span className="profile-info-text"> ID </span>

                                <input type="text" className="profile-info-input profile-info-content" id="id"
                                    value={id} onChange={(e) => setId(e.target.value)}
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
                            <div className="profile-info-street">
                                <span className="profile-info-text"> Street </span>

                                <input type="text" className="profile-info-input profile-info-content" id="street"
                                    value={street} onChange={(e) => setStreet(e.target.value)}
                                    placeholder="Avenida Reina Mercedes 5" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="registration-error-section">
                    <span className="registration-error-text"> {error} </span>
                </div>
                <input type="submit" value="Submit" onClick={handleSubmit} className="register-user-button" />

            </form>

        </div>
    )

}

