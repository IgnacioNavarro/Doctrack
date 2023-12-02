import { useState } from 'react';
import { getEnterprise, updateEnterprise, updateMinimumLevel, updateImageHash } from '../Web3/EnterpriseRegistration';
import { useEffect } from 'react';
import ipfs from '../Web3/ipfs';
import { Buffer } from 'buffer';

export default function Profile({ wallet }) {

    const [name, setName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [fiscalNumber, setFiscalNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [minimumLevel, setMinimumLevel] = useState('');
    const [buffer, setBuffer] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');





    function loadProfile(wallet) {

        getEnterprise(wallet).then(function (enterprise) {
            setName(enterprise.name);
            setBusinessName(enterprise.businessName);
            setFiscalNumber(enterprise.fiscalNumber);
            setPhone(enterprise.phone);
            setEmail(enterprise.email);
            setCountry(enterprise.country);
            setRegion(enterprise.region);
            setPostalCode(enterprise.postalCode);
            setCity(enterprise.city);
            setStreet(enterprise.street);
            setMinimumLevel(enterprise.minimumLevel);
            setIpfsHash(enterprise.imageHash);
        }
        );
    }


    useEffect(() => {
        loadProfile(wallet);

    }, []);


    const handleUpdate = (event) => {
        event.preventDefault();
        //updateUser(wallet, name, surname, id, phone, email, country, region, postalCode, city, street);
        updateEnterprise(wallet, name, businessName, fiscalNumber, phone, email, country, region, postalCode, city, street);
        updateMinimumLevel(wallet, minimumLevel);

    }


    const captureImage = (event) => {
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

    const handleImageUpdate = (event) => {
        event.preventDefault();
        console.log("submitting...");
        ipfs.add(buffer).then(({ path }) => {
            console.log("path", path);

            updateImageHash(wallet, path).then(function (result) {
                setIpfsHash(path);
            }
            );

        }).catch((err) => {
            console.error(err);
        });
        console.log("https://ipfs.infura.io/ipfs/" + ipfsHash);
    }

    return (
        <div className="container">


            <div className="section-title">
                <h1 className='section-title-text'>
                    <span className='section-title-span'>Profile</span>
                </h1>
            </div>

            <div className="profile-content">
                <div className="profile-section-image">
                    <form onSubmit={handleImageUpdate}>
                        <img src={`https://doctrack.infura-ipfs.io/ipfs/${ipfsHash}`} alt="profile-pic" className="profile-image" />
                        <input className="profile-image-selection" type='file' onChange={captureImage} />
                        <input className="profile-image-button" type='submit' value="Change picture" />
                    </form>
                </div>
                <div className="profile-info">
                    <form>
                        <div className="profile-info-level">
                            <span className="level-section"> 2 </span>
                            <div className="profile-info-section">
                                <div className="profile-info-wallet profile-info-name">
                                    <span className="profile-info-text"> Wallet </span>
                                    <span className="profile-info-wallet-address profile-info-content">{wallet}</span>
                                </div>
                                <div className="profile-info-name">
                                    <span className="profile-info-text"> Name </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="name"
                                        onChange={(e) => setName(e.target.value)} value={name} />

                                </div>
                                <div className="profile-info-surname profile-info-name">
                                    <span className="profile-info-text"> Business Name </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="businessName"
                                        onChange={(e) => setBusinessName(e.target.value)} value={businessName} />
                                </div>
                                <div className="profile-info-id">
                                    <span className="profile-info-text"> Fiscal Number </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="fiscalNumber"
                                        onChange={(e) => setFiscalNumber(e.target.value)} value={fiscalNumber} />
                                </div>
                                <div className="profile-info-phone">
                                    <span className="profile-info-text"> Phone </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="phone"
                                        onChange={(e) => setPhone(e.target.value)} value={phone} />
                                </div>
                                <div className="profile-info-mail">
                                    <span className="profile-info-text"> Mail </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="mail"
                                        onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className="profile-info-country">
                                    <span className="profile-info-text"> Country </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="country"
                                        onChange={(e) => setCountry(e.target.value)} value={country} />
                                </div>
                                <div className="profile-info-region">
                                    <span className="profile-info-text"> Region </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="region"
                                        onChange={(e) => setRegion(e.target.value)} value={region} />
                                </div>
                                <div className="profile-info-postalcode">
                                    <span className="profile-info-text"> Postal Code </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="postalcode"
                                        onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
                                </div>
                                <div className="profile-info-city">
                                    <span className="profile-info-text"> City </span>
                                    <input type="text" className="profile-info-input profile-info-content" id="city"
                                        onChange={(e) => setCity(e.target.value)} value={city} />
                                </div>
                                <div className="profile-info-street profile-info-name">
                                    <span className="profile-info-text"> Street </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="street"
                                        onChange={(e) => setStreet(e.target.value)} value={street} />
                                </div>
                                <div className="profile-info-min-level">
                                    <span className="profile-info-text"> Minimum Level </span>
                                    <select className="profile-info-input profile-info-content" id="min-level"
                                        onChange={(e) => {
                                            setMinimumLevel(e.target.value);
                                        }}
                                        value={minimumLevel}>
                                        <option value="0">Level 0 (wallet)</option>
                                        <option value="1">Level 1 (Level 0, name, surname)</option>
                                        <option value="2">2 (All data)</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <input type="submit" value="Submit" onClick={handleUpdate} className="register-user-button" />
                    </form>
                </div>
            </div>



        </div>
    )

}




