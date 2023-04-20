import escrowABI from "./Escrow.json"
import { ethers } from "ethers";
const escrowAddress = "0xB969d03A16Ac167353187001b121798770e3A86D";

export function initContract(kit: any) {
  return new kit.connection.web3.eth.Contract(escrowABI.abi, escrowAddress)
} 

//  Contract Calls
export const escrowFunds = async (address: string | null | undefined,
  kit: any, amount: string) => {
  try {
    const txHash = await initContract(kit).methods
      .escrowFunds(amount).send({
        from: address,
        value: ethers.utils.parseUnits(amount).toString()
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const groupRefund = async (address: string | null | undefined,
  kit: any) => {
  try {
    const txHash = await initContract(kit).methods
      .groupRefund().send({
        from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const batchTransfer = async (address: string | null | undefined,
  kit: any, escrowClientAddresses : any[], amount: any[]) => {
  try {
    const txHash = await initContract(kit).methods
      .batchTransfer(escrowClientAddresses, amount).send({
        from: address,
        value: amount
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
