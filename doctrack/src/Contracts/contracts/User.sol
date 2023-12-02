//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "./utils/Ownable.sol";

contract UserContract is Ownable {
    struct User {
        address wallet;
        string name;
        string surname;
        string id;
        string phone;
        string email;
        string country;
        string region;
        string postalCode;
        string city;
        string street;
        //Guardo los numeros como string porque no voy a operar con ellos, además que en este caso, pueden ser nulos o vacíos, mientras que si es un uint, no.
        string imageHash;
    }

    mapping(address => User) private users;

    function addUser(
        address _wallet,
        string memory _name,
        string memory _surname,
        string memory _id,
        string memory _phone,
        string memory _email,
        string memory _country,
        string memory _region,
        string memory _postalCode,
        string memory _city,
        string memory _street

    ) public {
        User memory user = User(
            _wallet,
            _name,
            _surname,
            _id,
            _phone,
            _email,
            _country,
            _region,
            _postalCode,
            _city,
            _street,
            "QmUso3hDnd4X14yM358fV7H4oqTqhh9sz18s2sH1QhLVW5"
        );
        users[_wallet] = user;
    }

    //TODO: GET user only if same wallet or enterprise
    function getUser(address _wallet) public view returns (User memory user) {
        user = users[_wallet];
    }

    //TODO: update user only if same wallet
    function updateUser(
        address _wallet,
        string memory _name,
        string memory _surname,
        string memory _id,
        string memory _phone,
        string memory _email,
        string memory _country,
        string memory _region,
        string memory _postalCode,
        string memory _city,
        string memory _street
    ) public requireUserExist(_wallet) requireWallet(_wallet) {
        User storage user = users[_wallet];
        user.name = _name;
        user.surname = _surname;
        user.id = _id;
        user.phone = _phone;
        user.email = _email;
        user.country = _country;
        user.region = _region;
        user.postalCode = _postalCode;
        user.city = _city;
        user.street = _street;
    }

    function updateImageHash(address _wallet, string memory _imageHash) public requireUserExist(_wallet) requireWallet(_wallet) {
        User storage user = users[_wallet];
        user.imageHash = _imageHash;
    }

    //modifier that require that user exist on the mapping
    modifier requireUserExist(address _wallet) {
        require(
            users[_wallet].wallet == _wallet &&
                users[_wallet].wallet != address(0)
        );
        _;
    }

    //modifier to check that wallet is the same as the one in the mapping
    modifier requireWallet(address _wallet) {
        require(msg.sender == _wallet);
        _;
    }


}
