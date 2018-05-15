import express from 'express';
import Setting from '../../model/setting';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        let result = await Setting.get();
        if (!result) {
            res.statusMessage = 'Setting not found';
            return res.status(404).end();
        }
        res.success(result);
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

router.post('/', async(req, res) => {
    try {
        let value = req.body;
        if (!value) {
            res.statusMessage = 'No value provided';
            return res.status(500).end();
        }
        let result = await Setting.set(value);
        if (!result) {
            res.statusMessage = 'Setting not found';
            return res.status(404).end();
        }
        res.success(result);
    } catch (error) {
        res.status(500).send({ error: error.message || error, trace: error.trace || null });
        console.error(error, error.stack);
    }
});

export default router;