
import Discord from 'discord.js';
// import MusicManager from './music-plugin/MusicManager';
import MusicManager from 'music-plugin';
import Setting from './setting';

export default class {

    static async connect(token) {
        let client = new Discord.Client();
        let musicManager = new MusicManager();
        musicManager.client = client;

        client.on('message', async(message) => {

            // Voice only works in guilds, if the message does not come from a guild, we ignore it
            if (!message.guild) return;
        
            // Ignore messages from other bots
            if (message.author.bot) return;
        
            // Ignore messages if bot doesn't have permissions to send messages.
            if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
        
            // Send messages if bot doesn't have permission to send embed.
            if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
                message.channel.send(`${client.user.username} does not have permission to send \`embed\` messages`)
                    .catch(console.error);
                return;
            }

            let setting = await Setting.get();
            let prefix = setting.prefix || '?';
            musicManager.volume = setting.volume / 100;
            musicManager.embedColor = Number('0x'+setting.embedColor);
            if (!setting.ytApiKey) return message.reply('missing YouTube API key');
            musicManager.ytApiKey = setting.ytApiKey;
            if (!message.content.startsWith(prefix)) return;
            message.content = message.content.substring(prefix.length);
        
            let tokens = message.content.match(/\S+/g);
            let command = tokens[0];
            if (!musicManager.allCommands.has(command)) {
                return;
            }
        
            /**
             * Normal commands need member to be connected to a voice channel.
             */
            if (musicManager.normalCommands.has(command)) {
                if (!message.member.voiceChannel) return message.reply('join a voice channel first!').catch(console.error);
            }
        
            musicManager.initQueue(message.guild.id, message.channel.id);
            musicManager[command](message);
        
        });
        
        try {
            await client.login(token);
            return {client: client, musicManager: musicManager};
        } catch (error) {
            return error;
        }
    }

    static async disconnect(client) {
        try {
            let result = await client.destroy();
            return result;
        } catch (error) {
            return error;
        }
    }

}