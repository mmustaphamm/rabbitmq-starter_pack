import amqp from "amqplib"
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';


async function connect() {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("orderME");
    channel.consume("orderME", (message:any) => {
      console.log({ message: message.content.toString() });
      channel.ack(message);
    });
  } catch (error) {
    console.log({ error });
  }
}

export default connect