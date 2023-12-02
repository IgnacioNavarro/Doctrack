import UserContract from '../../Contracts/build/contracts/EnterpriseContract.json';
import Web3 from "web3/dist/web3.min.js";
import { ethers } from 'ethers';

//contract details
const contractAdress = "0x89F996Aa27a164dc3fcc5045f0360dcE6a73Fac4";
const abi = UserContract.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const UserContractDeployed = new ethers.Contract(contractAdress, abi, provider.getSigner());

//Contract functions
export async function addEnterprise(wallet, name, businessName, fiscalNumber, phone, email, country, region , postalcode, city , street){
    await UserContractDeployed.addEnterprise(wallet, name, businessName, fiscalNumber, phone, email, country, region , postalcode, city , street);
}

export async function getEnterprise(wallet){
    const enterprise = await UserContractDeployed.getEnterprise(wallet);
    return enterprise;
}

export async function updateEnterprise(wallet, name, businessName, fiscalNumber, phone, email, country, region , postalcode, city , street){
    await UserContractDeployed.updateEnterprise(wallet, name, businessName, fiscalNumber, phone, email, country, region , postalcode, city , street);
}

export async function updateMinimumLevel(wallet, level){
    await UserContractDeployed.updateMinimumLevel(wallet, level);
}

export async function getAllEnterprises(){
    const enterprises = await UserContractDeployed.getAllEnterprises();
    return enterprises;
}

export async function updateImageHash(wallet, imageHash){
    await UserContractDeployed.updateImageHash(wallet, imageHash);
}




