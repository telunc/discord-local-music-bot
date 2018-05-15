import express from 'express';
import music from './api/music';
import setting from './api/setting';
import shell from './api/shell';

const router = express.Router();

router.use('/', async (req, res, next) => {
    // Convert objects
    res.success = (model) => {
        if (!model) return res.status(404).send();
        let results = null;
        if (model instanceof Array) {
            results = model.map((entry) => entry.toJSON ? entry.toJSON() : entry);
        } else {
            results = model.toJSON ? model.toJSON() : model;
        }

        res.set('Content-Type', 'application/json')
            .status(200)
            .send(JSON.stringify(results, null, 2));
    };

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return next();
});

router.use('/music', music);
router.use('/setting', setting);
router.use('/shell', shell);

export default router;