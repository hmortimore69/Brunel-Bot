import { Client, GatewayIntentBits, Message } from 'discord.js';

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message: Message) => {
    if (message.content.includes('ping')) {
        message.reply(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`);
    }
});

client.login('MTIwNDg4MzMzMzc5NzExNzk3Mw.GeKAFK.5z3693GYXaj0ErgBSx0uO7Zuc2wmaWO2VUtdkQ');