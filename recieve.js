const express = require('express')
var amqp = require('amqplib/callback_api');
const app = express();


amqp.connect('amqp://localhost', (err, conn) =>{
  if(err) throw err;
  conn.createChannel((err, ch) =>{
    const queue = 'MSG';

    ch.assertQueue(queue, {durable: false});
    console.log(`Waiting for messages in${queue}`);
    ch.consume(queue, (Message) => {
      console.log(`Received ${Message.content} `);
    }, {noAck: true});
  });
});

const PORT = 3001;
app.listen(PORT, ()=> console.log(`Server starting on port ${PORT}`));
