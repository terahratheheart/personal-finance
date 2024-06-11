import { createContext, useContext, useEffect, useState } from 'react';
import { FinancialRecord as  SharedFinancialRecordType } from '../../../server/src/types/types'
import { useUser } from '@clerk/clerk-react';

export interface FinancialRecord extends SharedFinancialRecordType  {
    _id?: string
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void
}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined >(undefined);

export const FinancialRecordsProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([])
    const { user}  = useUser()

    const fetchRecords = async () => {
        try{
            if(!user){
                return
            }
            const response = await fetch(`http://localhost:3001/financial-records/${user.id}`, {
            method: "GET", 
             })
             console.log(response)
            if(response.ok){
                const records = await response.json()
                setRecords(records)
            } 
        } catch(err){console.log(err)}
      
    };

    useEffect(() => {
        fetchRecords()
    }, [user] )

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch("http://localhost:3001/financial-records", {
            method: "POST", 
            body: JSON.stringify(record),
            headers: {
                "Content-type": "application/json"
            }
        })
        try{ 
            if(response.ok){
            const newRecord = await response.json()
            setRecords((prev) => [...prev, newRecord])
        }} catch(err){
            console.log(err)
        }
       
    }



    return (
        <FinancialRecordsContext.Provider value={{records, addRecord}}>
            {children}
        </FinancialRecordsContext.Provider>
    )
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinancialRecordsContext
    )

    if(!context){
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        )
    }

    return context
}