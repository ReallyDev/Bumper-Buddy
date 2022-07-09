const client = require("..");

client.on("threadCreate", (thread) => {
  try {
    thread.join();
  } catch (e) {
    console.log(e.message);
  }
});

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Name Later
*/