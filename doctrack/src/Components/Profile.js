import { useState } from 'react';
import { getUser, updateUser, updateImageHash } from './Web3/UserRegistration';
import { useEffect } from 'react';
import ipfs from './Web3/ipfs';
import { Buffer } from 'buffer';

export default function Profile({ wallet }) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [buffer, setBuffer] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');



    function loadProfile(wallet) {

        getUser(wallet).then(function (user) {
            setName(user.name);
            setSurname(user.surname);
            setId(user.id);
            setPhone(user.phone);
            setEmail(user.email);
            setCountry(user.country);
            setRegion(user.region);
            setPostalCode(user.postalCode);
            setCity(user.city);
            setStreet(user.street);
            setIpfsHash(user.imageHash);
        });

    }


    useEffect(() => {
        loadProfile(wallet);

    }, []);


    const handleUpdate = (event) => {
        event.preventDefault();
        updateUser(wallet, name, surname, id, phone, email, country, region, postalCode, city, street);

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
                    <div className="profile-info-title">
                        <h3 className="profile-info-title-level">Level</h3>
                        <h3 className="profile-info-title-text">Profile Information</h3>
                    </div>
                    <form>
                        <div className="profile-info-level">
                            <span className="level-section"> 0 </span>
                            <div className="profile-info-section">
                                <div className="profile-info-wallet">
                                    <span className="profile-info-text"> Wallet </span>
                                    <span className="profile-info-wallet-address profile-info-content">{wallet}</span>
                                </div>
                            </div>
                        </div>
                        <div className="profile-info-level">
                            <span className="level-section"> 1 </span>
                            <div className="profile-info-section">
                                <div className="profile-info-name">
                                    <span className="profile-info-text"> Name </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="name"
                                        onChange={(e) => setName(e.target.value)} value={name} />

                                </div>
                                <div className="profile-info-surname">
                                    <span className="profile-info-text"> Surname </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="surname"
                                        onChange={(e) => setSurname(e.target.value)} value={surname} />
                                </div>
                            </div>
                        </div>
                        <div className="profile-info-level">
                            <span className="level-section"> 2 </span>
                            <div className="profile-info-section">
                                <div className="profile-info-id">
                                    <span className="profile-info-text"> ID </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="id"
                                        onChange={(e) => setId(e.target.value)} value={id} />
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
                                <div className="profile-info-street">
                                    <span className="profile-info-text"> Street </span>

                                    <input type="text" className="profile-info-input profile-info-content" id="street"
                                        onChange={(e) => setStreet(e.target.value)} value={street} />
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




