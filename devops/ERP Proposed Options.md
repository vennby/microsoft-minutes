This is a documentation on evaluating the proposed options for the MTC ERP "Micromanager". This document contains two sections:
1. Evaluating Tech stacks
2. Evaluating Payment gateways

Document prepared by [Sreenikethan I](https://github.com/SreenikethanI).

---

# Evaluating Tech stacks
Requirements for selecting one (in my opinion, most important first):
1. ability to use custom domain `erp.mtcbpdc.org`
2. dev team's familiarity
3. cheap
4. admin panel for managing databases, as an emergency backup

<br>

### 1. Flask (Python)
*Frontend:* Jinja templating
*Backend:* Flask (Python)
*Database:* Many, such as MySQL, SQLite, PostgreSQL

Pros:
1. SQLAlchemy provides ORM system that makes database operations really intuitive
2. More of devteam has Python experience
3. OAuth (with Google) is easier

Cons:
1. No admin panel, but there exist extensions e.g. "Flask-Admin"
2. Minimum cost is $4 to $5 per month

Available hosting solutions (backend):
1. $4/month = *176 AED/year* - DigitalOcean: "Droplet" VPS*
2. €3.79/month = *192 AED/year* - Hetzner VPS*
3. $5/month = *220 AED/year* - Nanode: VPS*
4. $5/month = *220 AED/year* - PythonAnywhere
5. $5/month = *220 AED/year* - railway.com
6. $5/month = *220 AED/year* - Heroku: It sleeps after inactivity though.
7. $7/month = *308 AED/year* (at-least) - render.com
8. im not sure about vercel, the database part isn't really clear to me on their website

<br>

### 2. LAMP stack (PHP)
*Frontend:* ideally anything, for example plain HTML/CSS/JS, even React technically, etc.
*Backend:* PHP
*Database:* MySQL

Pros:
1. Mature tech stack
2. Free hosting available
3. Many options for Admin panels

Cons:
1. Templating engine doesn't come in-built, so we gotta search for one (in my personal opinion, large setback)
2. Learning curve for devs on our team
3. OAuth (with Google) is more involved

Available hosting solutions (backend):
1. *free* - InfinityFree
2. *free* - AwardSpace. Slow speeds and potentially ads
3. $4/month = *176 AED/year* - DigitalOcean "Droplet" VPS*
4. $4/month = *176 AED/year* - Hostinger
5. €3.79/month = *192 AED/year* - Hetzner VPS*, but "they don't accept everyone, especially if you're not from the EU without a business account" acc to one article
6. $5/month = *220 AED/year* - Nanode VPS*

<br>

Some important notes:
- If needed, CSS frameworks like Tailwind can be installed on both stacks, so that's not an issue
- \*VPS stands for "Virtual Private Server", which are basically Linux VMs that we have to fully configure *ourselves*, for example to install Flask/Python or to setup a LAMP server.

---

# Evaluating Payment gateways
### 1. Aani
- Payment platform that's integrated with so many banks in the UAE
- The payer needs their bank's app installed on their phone, which may not be always possible since mostly the accounts belong to their parents.

### 2. Ziina
- Direct transfer to a given QR code or link, like GPay
- Can be paid using card, Apple Pay, Samsung Pay, etc.

