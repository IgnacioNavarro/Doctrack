import UserContract from '../../Contracts/build/contracts/UserContract.json';
import Web3 from "web3/dist/web3.min.js";
import { ethers } from 'ethers';

//contract details
const contractAdress = "0x0BE1496D9FeeC77c481a927dcA0bA6d2A4F0bAcC";
const abi = UserContract.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
const UserContractDeployed = new ethers.Contract(contractAdress, abi, provider.getSigner());

//Contract functions
export async function addUser(wallet, name, surname, id, phone, email, country, region , postalcode, city , street){
    await UserContractDeployed.addUser(wallet, name, surname, id, phone, email, country, region , postalcode, city , street);
}

export async function getUser(wallet){
    const user = await UserContractDeployed.getUser(wallet);
    return user;
}

export async function updateUser(wallet, name, surname, id, phone, email, country, region , postalcode, city , street){
    await UserContractDeployed.updateUser(wallet, name, surname, id, phone, email, country, region , postalcode, city , street);
}

export async function updateImageHash(wallet, hash){
    await UserContractDeployed.updateImageHash(wallet, hash);
}
