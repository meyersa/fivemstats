// Bot Created by Meyers#6464

import { Client, Intents } from "discord.js";
import fetch from "node-fetch";

const channelID = process.env.channelID;
const clientToken = process.env.clientToken;
const clientInterval = process.env.clientInterval;
const serverURL = process.env.serverURL;
const channelPrefix = process.env.channelPrefix;

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.on('ready', async () => {
    const channel = await client.channels.fetch(channelID);

    setInterval(() => {
        updateChannel(channel).catch((e) => console.error((e)))

    }, clientInterval);

});

client.login(clientToken);

async function updateChannel(channel) {
    var webResultsInfo = await (await fetch(serverURL + "/info.json")).json();
    var webResultsPlayers = await (await fetch(serverURL + "/players.json")).json();

    await channel.edit( {name: `${channelPrefix} ${Object.keys(webResultsPlayers).length} / ${webResultsInfo.sv_maxClients} ` });
    
}