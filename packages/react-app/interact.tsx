import escrowABI from "./Escrow.json"
import { BigNumber, ethers } from "ethers";
import Web3 from 'web3';
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

const escrowAddress = "0xF894B143FcF4f12Aa7135bc1Bd6e87c1357c4EA6";

export function initContract(kit: any) {
  return new kit.connection.web3.eth.Contract(escrowABI.abi, escrowAddress)
} 

//  Contract Calls
export const escrowFunds = async (address: string | null | undefined,
  kit: any, amount: string, receiver: string, releaseTime: string) => {
  try {
    const txHash = await initContract(kit).methods
      .escrowFunds().send({
        from: address,
        value: ethers.utils.parseUnits(amount).toString()
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const groupTransfer = async (address: string | null | undefined,
  kit: any) => {
  try {
    const txHash = await initContract(kit).methods
      .groupTransfer().send({
        from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const batchTransfer = async (address: string | null | undefined,
  kit: any, escrowClientAddresses : string[], amount: string[]) => {
  try {
    const txHash = await initContract(kit).methods
      .batchTransfer(escrowClientAddresses, amount).send({
        from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getEcrowList = async (kit: any) => {
  try {
    const response = await initContract(kit).methods.getEcrowList().call()
    console.log(response)
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const getContractBalance = async (kit: any) => {
  try {
    const response = await initContract(kit).methods.getContractBalance().call()
    console.log(response)
    return response;
  } catch (e) {
    console.log(e)
  }
}

export const BatchTransaction = async (kit: any, account: string |null|undefined, transaction: any[]) => {
  try {
    // Check if Web3 instance is available
    if (web3) {
      // Create a batch object
      // const batch = new web3.BatchRequest();
      const batch = new kit.connection.web3.BatchRequest()

      for (let i = 0; i < transaction.length; i++){
           // Add transactions to the batch
        batch.add(web3.eth.sendTransaction.request(
          {
            from: account,
            to: transaction[i].address,
            value: ethers.utils.parseUnits(transaction[i].amount).toString()
          }
        ));
      }
       // Execute the batch
      batch.execute()
    }
  } catch (error) {
      console.error('Batch Transaction Error:', error);
    }
};
