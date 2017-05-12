"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET Ingram API test page.
 */
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('ingram', { title: 'Ingram API test' }, function (err, html) {
        console.log('Ingram API test page');
        if (!err) {
            res.send(html);
        }
        else {
            console.log(err);
        }
    });
});
exports.default = router;
//# sourceMappingURL=ingram.js.map