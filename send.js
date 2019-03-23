const express = require('express');
const amqp = require('amqplib/callback_api');

//Init express
const app = express();

//Create connection with rabbitMQ
amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel( (err,ch) =>{
    if(err) throw err;
    const queue = 'MSG';
    const Message = {Content: 'Hello John , how are you?'}

    ch.assertQueue(queue, {durable: false})
    ch.sendToQueue(queue, new Buffer.from(JSON.stringify(Message)));
    console.log('Message was sent')
    })
   // setTimeout(() => { conn.close(); process.exit(0) }, 3000);
});


//Set up home route
app.get('/', (req,res) =>{
    res.send('RabbitMQ')
})


//Set up server
const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))