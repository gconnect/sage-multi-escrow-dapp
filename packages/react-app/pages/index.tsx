import React, { useState, useEffect  } from 'react'
import {
   payEmployees,
  getEmployees, removeEmployees
} from '@/interact'
import { useCelo } from '@celo/react-celo';
import InputFieldList from '@/components/InputField';

export default function Home() {

  const { kit, address } = useCelo()
  const [employees, setEmployees] = useState<any[]>([])

  // const handleDeleteAll = async () => {
  //   await removeEmployees(address, kit);
  // }

  //  const handleEmployees = async () => {
  //   const employeeList = await getEmployees(kit)
  //   setEmployees(employeeList)
  // }

  // const handlePayEmployees = async () => {
  //   await payEmployees(address, kit);
  // }

  useEffect(() => {
    // handleEmployees()
  }, [])
 
  return (
    <div>
    {!address ? <div>Please connect your wallet</div> :  
        <div>
          <h1 className='text-4xl text-center m-4'>Multi-Party Escrow Dapp</h1>
          <div className="flex ">
            <InputFieldList/>
          </div>
             <button
                type="button"
                className="mt-4 inline-block rounded bg-teal-500 px-6 pt-2.5 pb-2 text-xs mx-2
                 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Batch Transfers
            </button>
        </div>      
    }
    </div>   
  )
}
