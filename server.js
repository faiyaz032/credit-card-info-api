//dependenceis
const express = require('express');
const cors = require('cors');

//internal imports
const data = require('./data');

//initialise express app
const app = express();

//enable cors
app.use(cors({ origin: '*' }));

//initalise body parser
app.use(express.json());

//MAIN API FUNCTION
app.post('/api', (req, res, next) => {
   //check if the input matches any record in the data.js file
   const notMatches = data.every((item) => Number(req.body.creditCardNumber) !== item.creditCardNumber);
   if (notMatches) {
      //return fail response
      return res
         .status(402)
         .json({ status: 'fail', message: 'Your entered credit card number does not match any record' });
   }

   //send succuess response
   return res.status(202).json({ status: 'success', message: 'Data fetched successfully', data: data });
});

//define ports
const PORT = process.env.PORT || 5000;

//start the server
app.listen(PORT, () => console.log(`Server is alive on PORT:${PORT}`));
