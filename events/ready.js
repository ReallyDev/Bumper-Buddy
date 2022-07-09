const client = require("..");

client.on('ready', async () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity({
        name : `/help | Ghex, Real_IceyDev & Link`,
        url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        type : 'STREAMING',
    });

    await client.application.commands
      .set(client.commands.toJSON(), '989314797344538654')
      .then((s) => {
        console.log("Successfully reloaded application (/) commands.");
      })
      .catch((e) => {
        console.log(e.stack);  
      });
})

/**
Coded by: Real_IceyDev, Ghex, & Link
License: Attribution-NonCommercial-ShareAlike 4.0 International
Name Later
*/