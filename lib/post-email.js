var request = require('request');

module.exports = {
    postEmail(parseError, mail) {
        console.log('Email received ----------');
        console.log(mail);
        console.log('----------');

        var options = {
            method: 'POST',
            uri: process.env.POST_URI,
            json: mail,
        };

        request(options, handleResponse);

        function handleResponse(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(
                    'Succesfully sent to endpoint',
                    JSON.stringify(options)
                );
            } else {
                console.log(
                    'Something went wrong while sending the request',
                    JSON.stringify(options),
                    error,
                    response
                );
            }
            console.log('----------');
        }
    }
}
