
import {
    useUser
   } from '@clerk/clerk-react' 
import { FinancialRecordForm } from './FinancialRecordForm'
import { FinancialRecordList } from './FinancialRecordList'
   
   export const Dashboard = () => {
       const {user} = useUser()
       return (
       <div className='dashboard-container'>
           <h1>Welcome {user?.firstName}! Here are Yr Finances:</h1>
           <FinancialRecordForm />
            <FinancialRecordList />
       </div>
   
       )
   }