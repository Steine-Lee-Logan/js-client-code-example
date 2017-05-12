/*
 * GET Ingram API test page.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('ingram', { title: 'Ingram API test' }, (err, html) => {
        console.log('Ingram API test page');

        if (!err) {
            res.send(html);
        } else {
            console.log(err);
        }
    });
});

export default router;