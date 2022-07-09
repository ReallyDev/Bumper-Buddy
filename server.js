module.export = () => {
  const express = require("express"); const app = express();
  const port = 3000;
  
  app.get("/", (req, res) => {
    res.send("Real_IceyDev#3339 & Ghex#7338 | Hosting service is responding!");
  });
  
  app.listen(port, () => {
   console.log(`Hosting service is listening! Port: ${port}`);
  });
}

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Name Later
*/