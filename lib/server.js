const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const postEmail = require('./post-email').postEmail;

if (!process.env.POST_URI) {
    console.log(
        'ERROR: POST_URI environment variable should be defined ' +
        'with the URI to your API endpoint expecting the JSON email'
    );
    process.exit(1);
}

const server = new SMTPServer({
    secure: false,
    authOptional: true,
    onData(stream, session, callback) {
        simpleParser(stream, postEmail);
    },
});

server.listen(8080);
