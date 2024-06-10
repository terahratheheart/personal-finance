import express, { Express } from 'express'
import mongoose from 'mongoose'
import financialRecordRouter from './routes/financialRecords';

const app: Express = express();
const port = process.env.PORT || 3001

app.use(express.json());

const mongoURI: string = "mongodb+srv://terahbruce:TEn9M2Ja09gSiR0b@personalfinancetracker.ewps0ea.mongodb.net/";

mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.error("failed to connect", err)) 

app.use("/financialRecords",  financialRecordRouter)

app.listen(port, () => {
    console.log('Running on port')
})