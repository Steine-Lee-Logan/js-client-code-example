/*
 * GET Ingram API test page.
 */
import express = require('express');
const router = express.Router();

router.get('/ingram', (req: express.Request, res: express.Response) => {
    res.render('ingram', { title: 'Ingram API test' }, function (err, html) {
        console.log(err);
        console.log('Ingram API test page');
    });
});

export default router;