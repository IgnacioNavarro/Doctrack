import MessageContract from '../../Contracts/build/contracts/MessageContract.json';
import Web3 from "web3/dist/web3.min.js";
import { ethers } from 'ethers';

//contract details
const contractAdress = "0xBe24Ea592692c09C69f4D880095C9acaD1873DB2";
const abi = MessageContract.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const MessageContractDeployed = new ethers.Contract(contractAdress, abi, provider.getSigner());


//contract functions
export async function writeMessage(userWallet, enterpriseWallet, subject, content, documentHash){
    await MessageContractDeployed.writeMessage(userWallet, enterpriseWallet, subject, content, documentHash );
}

export async function getMessage(id){
    const message = await MessageContractDeployed.getMessage(id);
    return message;
}

export async function getAllMessagesFromUser(userWallet){
    const messages = await MessageContractDeployed.getAllMessagesFromUser(userWallet);
    return messages;
}

export async function getAllMessagesFromEnterprise(enterpriseWallet){
    const messages = await MessageContractDeployed.getAllMessagesFromEnterprise(enterpriseWallet);
    return messages;
}

export async function setDownloaded(id){
    await MessageContractDeployed.setDownloaded(id);
}

export async function setConfirmed(id){
    await MessageContractDeployed.setConfirmed(id);
}

export async function setRejected(id){
    await MessageContractDeployed.setRejected(id);
}




