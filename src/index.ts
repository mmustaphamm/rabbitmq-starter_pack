import express, { Application,} from "express";
import amqp from "amqplib"
import conn from './consume'

const app:Application = express()

conn()
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';

app.get('/', async (req, res) => {
    try{
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
        channel.assertQueue("orderME", {durable: true});
        channel.sendToQueue("orderME", Buffer.from(JSON.stringify({
            name: 'Bayo',
            customerId: 4,
            orderId: 6,
            number: "111 222 3333"
        })));
    }catch(error){
        console.log('done')
    }
    res.send('blockers')
  })

app.listen(3000, ()=>{
    console.log('now listening')
})