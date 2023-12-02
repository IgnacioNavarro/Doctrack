//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "./utils/Ownable.sol";

contract EnterpriseContract is Ownable {
    struct Enterprise {
        address wallet;
        string name;
        string businessName;
        string fiscalNumber;
        int8 minimumLevel;
        string phone;
        string email;
        string country;
        string region;
        string postalCode;
        string city;
        string street;
        string imageHash;
        //Guardo los numeros como string porque no voy a operar con ellos, además que en este caso, pueden ser nulos o vacíos, mientras que si es un uint, no.
    }

    mapping(address => Enterprise) private enterprises;
    address[] public enterprisesWalletArray;

    function addEnterprise(
        address _wallet,
        string memory _name,
        string memory _businessName,
        string memory _fiscalNumber,
        string memory _phone,
        string memory _email,
        string memory _country,
        string memory _region,
        string memory _postalCode,
        string memory _city,
        string memory _street
    ) public {
        Enterprise memory enterprise = Enterprise(
            _wallet,
            _name,
            _businessName,
            _fiscalNumber,
            0,
            _phone,
            _email,
            _country,
            _region,
            _postalCode,
            _city,
            _street,
            "QmUso3hDnd4X14yM358fV7H4oqTqhh9sz18s2sH1QhLVW5"
        );
        enterprises[_wallet] = enterprise;
        enterprisesWalletArray.push(_wallet);
    }

    function updateMinimumLevel(address _wallet, int8 _minimumLevel) public {
        Enterprise storage enterprise = enterprises[_wallet];
        enterprise.minimumLevel = _minimumLevel;
    }

    function updateImageHash(address _wallet, string memory _imageHash)
        public
        requireEnterpriseExist(_wallet)
        requireWallet(_wallet)
    {
        Enterprise storage enterprise = enterprises[_wallet];
        enterprise.imageHash = _imageHash;
    }

    //TODO: GET Enterprise only if same wallet or enterprise
    function getEnterprise(address _wallet)
        public
        view
        returns (Enterprise memory enterprise)
    {
        enterprise = enterprises[_wallet];
    }

    //TODO: update Enterprise only if same wallet
    function updateEnterprise(
        address _wallet,
        string memory _name,
        string memory _businessName,
        string memory _fiscalNumber,
        string memory _phone,
        string memory _email,
        string memory _country,
        string memory _region,
        string memory _postalCode,
        string memory _city,
        string memory _street
    ) public requireEnterpriseExist(_wallet) requireWallet(_wallet) {
        Enterprise storage enterprise = enterprises[_wallet];
        enterprise.name = _name;
        enterprise.businessName = _businessName;
        enterprise.fiscalNumber = _fiscalNumber;
        enterprise.phone = _phone;
        enterprise.email = _email;
        enterprise.country = _country;
        enterprise.region = _region;
        enterprise.postalCode = _postalCode;
        enterprise.city = _city;
        enterprise.street = _street;
    }

    /* function to get all enterprises from mapping */
    function getAllEnterprises()
        public
        view
        returns (Enterprise[] memory enterpriseList)
    {
        enterpriseList = new Enterprise[](enterprisesWalletArray.length);
        for (uint256 i = 0; i < enterprisesWalletArray.length; i++) {
            address wallet = enterprisesWalletArray[i];
            enterpriseList[i] = enterprises[wallet];
        }
        return enterpriseList;
    }

    //modifier that require that Enterprise exist on the mapping
    modifier requireEnterpriseExist(address _wallet) {
        require(
            enterprises[_wallet].wallet == _wallet &&
                enterprises[_wallet].wallet != address(0)
        );
        _;
    }

    //modifier to check that wallet is the same as the one in the mapping
    modifier requireWallet(address _wallet) {
        require(msg.sender == _wallet);
        _;
    }
}
