const db = require('./db/connection');
const express = require ('express');

const PORT = process.env.PORT || 3001;
const app = express();

const index = require ('./routes/index');


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


// function exitApp () {
//     db.end();
// }
