const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const dealerRoutes = require('./Dealer/dealer');
const vehicleRoutes = require('./Vehicle/vehicle');
const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader(
        'Acess-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    res.setHeader( 'X-Requested-With', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
})

app.use('/', dealerRoutes);
app.use('/', vehicleRoutes);

const server = app.listen(5000, () => console.log('Server ready'));

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
