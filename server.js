module.exports = () => {
  const express = require("express");
  const app = express();
  const port = 3000;

  app.set('view engine', 'ejs');
  
  app.get("/", (req, res) => {
    res.render('pages/index', {
      name: 'Bumper Buddy',
      message: 'Real_IceyDev#3339 & Ghex#7338 | Hosting service is responding!'
    });
  });
  
  app.listen(port, () => {
   console.log(`Hosting service is listening to port: ${port}`);
  });
}

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/