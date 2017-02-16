# SMTP to JSON Server

This module or docker image will:

1. Spawn a SMTP Server at port 8080
2. Parse the emails received there
3. POST the results to given endpoint

# Build docker
Build docker image:
```
docker build -t carlosbaraza/smtp2json:latest .
```

# Run image
Run image exposing port 8080 as 25 (requires root access) and
setting the ENV variable POST_URI to the URI of your service:
```
sudo docker run -p 25:8080 -e POST_URI='https://yourservice.com/emails' carlosbaraza/smtp2json:latest
```

# Test SMTP server:
1. Create a mockbin: http://mockbin.org/bin/create
2. Start the server: `sudo docker run -p 25:8080 -e POST_URI='https://mockbin.org/bin/71c8cf5c-f6fb-4f39-a7e8-b50c8fb7410d' carlosbaraza/smtp2json:latest`
3. Use telnet to send a fake email: `telnet localhost 25`
4. Paste this fake email:
```
HELO localhost
MAIL FROM: <foo@foo.com>
RCPT TO: <bar@bar.com>
DATA
Subject: Test subject
To: Carlos
From: Foo

This is the body for the email.

With multiple paragraphs.

.
QUIT
```

# Publish to Docker Cloud

* Build docker image:
```
docker build -t carlosbaraza/smtp2json:latest .
```

* Publish to docker cloud repository:
```
docker push carlosbaraza/smtp2json:latest
```

* Create docker cloud service:
```
privileged: true
export port 8080 as 25 (Default SMTP port)
set env variable POST_URI with the URI to the API endpoint
```

* Add DNS MX record pointing to Service hostname
```
SUBDOMAIN.YOURDOMAIN.COM. MX 0 smtp2json-12345678.12345678.svc.dockerapp.io
```

* Send test email to `test@SUBDOMAIN.YOURDOMAIN.COM`

* Check logs to confirm it worked
