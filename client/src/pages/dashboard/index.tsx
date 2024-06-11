import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./FinancialRecordForm";
import { FinancialRecordList } from "./FinancialRecordList";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/FinancialRecordContext";
import { useMemo } from "react";
export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += Number(record.amount);
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordForm />
      <div>Total Monthly: ${totalMonthly}</div>
      <FinancialRecordList />
    </div>
  );
};