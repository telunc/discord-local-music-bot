import express from 'express';
import music from '../../services/music';

const router = express.Router();

router.get('/account', async(req, res) => {
    try {
        if (!req.app.locals.client) {
            res.statusMessage = 'Client is not connected';
            return res.status(404).end();
        }
        let user = req.app.locals.client.user;
        let avatarURL = (user.avatarURL) ? user.avatarURL.replace('2048', '256') : 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png';
        return res.success({
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
            bot: user.bot,
            avatarURL: avatarURL
        });
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

router.get('/commands', async(req, res) => {
    try {
        return res.success({
            commands: [
                { name: 'play', description: 'Play YouTube music' },
                { name: 'join', description: 'Join voice channel' },
                { name: 'leave', description: 'Leave voice channel' },
                { name: 'pause', description: 'Pause current song' },
                { name: 'resume', description: 'Resume current song' },
                { name: 'skip', description: 'Skip current song' },
                { name: 'current', description: 'Display current playing song' },
                { name: 'queue', description: 'Display songs in queue' },
                { name: 'shuffle', description: 'Shuffle songs in queue' },
                { name: 'clear', description: 'Clear songs in queue' },
            ]
        });
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

router.post('/disconnect', async(req, res) => {
    try {
        if (!req.app.locals.client) {
            res.statusMessage = 'Client is not connected';
            return res.status(404).end();
        }
        let result = await music.disconnect(req.app.locals.client);
        if (result instanceof Error) {
            res.statusMessage = result.message;
            return res.status(500).end();
        } else {
            res.statusMessage = 'Disconnected';
            res.status(200).end();
            req.app.locals.client = null;
            return;
        }
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

router.post('/:id/connect', async(req, res) => {
    try {
        if (req.app.locals.client) {
            res.statusMessage = 'Client is already connected';
            return res.status(500).end();
        }
        let id = req.params.id;
        let result = await music.connect(id);
        if (result instanceof Error) {
            res.statusMessage = result.message;
            return res.status(500).end(result.message);
        }
        res.app.locals.client = result.client;
        res.app.locals.musicManager = result.musicManager;
        res.statusMessage = 'Connected';
        res.status(200).end();
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

export default router;