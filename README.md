# SMTP to JSON Server

This module or docker image will:
1. Spawn a SMTP Server at port 8080
2. Parse the emails received there
3. POST the results to given endpoint

# Build and run
1. Build docker image:
```
docker build -t carlosbaraza/smtp2json:latest .
```

2. Run image exposing port 8080 as 25 (requires root access):
```
sudo docker run -p 25:8080 carlosbaraza/smtp2json:latest
```

3. Test SMTP server:
```
telnet localhost 25
```

then paste this email:
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

1. Build docker image:
```
docker build -t carlosbaraza/smtp2json:latest .
```

2. Publish to docker cloud repository:
```
docker push carlosbaraza/smtp2json:latest
```

3. Create docker cloud service:
```
privileged: true
export port 8080 as 25 (Default SMTP port)
```

4. Add DNS MX record pointing to Service hostname
```
SUBDOMAIN.YOURDOMAIN.COM. MX 0 smtp2json-12345678.12345678.svc.dockerapp.io
```

5. Send test email to `test@SUBDOMAIN.YOURDOMAIN.COM`

6. Check logs to confirm it worked
