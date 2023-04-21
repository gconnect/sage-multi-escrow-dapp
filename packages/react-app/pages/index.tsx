import React, { useState, useEffect, useCallback  } from 'react'
import {
  escrowFunds,
   getContractBalance, getEcrowList, groupTransfer
} from '@/interact'
import { useCelo } from '@celo/react-celo';
import InputFieldList from '@/components/InputField';

export default function Home() {

  const { kit, address } = useCelo()
  const [employees, setEmployees] = useState<any[]>([])
  const [contractBal, setContractBal] = useState<number>(0)
  const [users, setUsers] = useState<any[]>([])
  const [input, setInput] = useState<string>("")
  const [receiver, setReceiver] = useState<string>("")
  const [releaseTime, setReleaseTime] = useState<string>("")


  
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const handleReceiver = (e: React.FormEvent<HTMLInputElement>) => {
    setReceiver(e.currentTarget.value)
    }
    const handleReleaseTime = (e: React.FormEvent<HTMLInputElement>) => {
    setReleaseTime(e.currentTarget.value)
  }

  const fundEscrowAccount = useCallback(async () => {
    if (input || receiver || releaseTime) {
      await escrowFunds(address, kit, input, receiver, releaseTime);
    } else {
      alert("Field required")
    }
    }, [kit, address, input, receiver, releaseTime])
  
  const handleContractBalance = useCallback( async () => {
    const res = await getContractBalance(kit);
    setContractBal( res)
  }, [kit])

    const handleUsers = useCallback( async () => {
    const res = await getEcrowList(kit);
    setUsers(res)
  }, [kit])

  useEffect(() => {
    handleContractBalance()
    handleUsers()
  }, [handleContractBalance, handleUsers])
 
  return (
    <div>
    {!address ? <div>Please connect your wallet</div> :  
        <div>
          <h1 className='text-4xl text-center m-4'>Multi-Party Escrow Dapp</h1>
          <h1 className='my-4'>{`Escrow Account Bal: ${contractBal/1e18} CELO`}</h1>
          <div className="flex ">
            <InputFieldList/>
          </div>
          <div>
          <input className='border-2 p-2' type="text" placeholder='Receiver' value={receiver} onChange={handleReceiver}/>
          <input className='border-2 p-2' type="text" placeholder='Release time' value={releaseTime} onChange={handleReleaseTime}/>
          <input className='border-2 p-2' type="text" placeholder='make deposit' value={input} onChange={handleInput}/>
          <button
            onClick={fundEscrowAccount}
                type="button"
                className="mt-4 inline-block rounded bg-teal-500 px-6 pt-2.5 pb-2 text-xs mx-2
                 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Fund Escrow Account
          </button>
          </div>
          <button
            onClick={() => groupTransfer(address, kit)}
                type="button"
                className="mt-4 inline-block rounded bg-yellow-500 px-6 pt-2.5 pb-2 text-xs mx-2
                 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Group Transfer
          </button>
          {users.length < 1 ? null : 
          <div>
            <h1 className='text-lg my-4'>Escrow Customers</h1>
            <table>
              <tr>
                <th className='border-2'>Sender Address</th>
                <th className='border-2'>Amount Deposited</th>
                </tr>
                  {users && users.map((item, index) => <tr key={index}>
                  <td className='border-2'>{item.sender}</td>
                  <td className='border-2'>{` ${item.amount/1e18} CELO`}</td>
            </tr>)}
            </table>      
          </div>}
        </div>      
    }
    </div>   
  )
}
