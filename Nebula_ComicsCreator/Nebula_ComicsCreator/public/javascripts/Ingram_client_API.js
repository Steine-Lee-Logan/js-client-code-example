$(function () {
    var $btn = $('#TestIngramAPI');

    $btn.click(function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var request = new Request('/ingram/test_api', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ "name": "Lee Steiner" })
        });

        fetch(request).then(function (res) {
            console.log(res);    

            return res.json();

        }).then(function (data) {

            console.log(data);

            }).catch(function (err) {

                console.log(err);

            });    
    });
});