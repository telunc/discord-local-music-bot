
import express from 'express';
import { shell } from 'electron';

const router = express.Router();


router.get('/how-to-get-youtube-key', async(req, res) => {
    try {
        shell.openExternal('https://github.com/telunc/discord-local-music-bot/wiki/YouTube-API-Key');
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

router.get('/how-to-get-disord-token', async(req, res) => {
    try {
        shell.openExternal('https://github.com/telunc/discord-local-music-bot/wiki/Setup-Guide');
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

export default router;