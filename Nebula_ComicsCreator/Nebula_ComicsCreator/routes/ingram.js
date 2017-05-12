"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET Ingram API test page.
 */
var express = require("express");
var router = express.Router();
router.get('/ingram', function (req, res) {
    res.render('ingram', { title: 'Ingram API test' }, function (err, html) {
        console.log(err);
        console.log('Ingram API test page');
    });
});
exports.default = router;
//# sourceMappingURL=ingram.js.map