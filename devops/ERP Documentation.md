This is a documentation for the MTC ERP "Micromanager".
View the "ERP Proposed Options" document for more info on the available options on the tech stack, payment gateway, etc. The chosen tech stack is PHP + [WordPress](https://wordpress.org), hosted on [InfinityFree](https://infinityfree.com).

---

# Documentation

Some theory:
- InfinityFree has a concept of "profile", which is what you log into. Under a profile, you can create three "accounts", where each "account" is dedicated for one website.
- InfinityFree comes with [cPanel](https://cpanel.net), which is a very popular admin panel for managing webservers.
- We have installed WordPress into the website, which is a content management system. Its most important features include security and account management.
- We'll be creating a WordPress Theme. A WordPress Theme dictates the content that appears on your website. We'll effectively design our own content, functionality, pages, etc. under this "theme".

Some quick links:
- ERP: https://erp.mtcbpdc.org
- InfinityFree login: https://dash.infinityfree.com/login
- WordPress admin page login: http://erp.mtcbpdc.org/wp-admin

---

# Requirements
So far, it's a rough list, but you get the idea. Deadline is 30<sup>th</sup> August 2025 for all teams to submit their requirements for the ERP.

### Member POV
1. a dashboard which shows my details, membership status, and navigation links to other pages
2. view past competitions and events, their write-ups, and their winners
3. mark attendance for an on-going competition/event (although this can be frauded easily, so we can probably make this an admin-only operation, or maybe make members submit attendance and an admin VERIFIES it)
4. fetch all my certificates for the competitions/events which i have participated

### Admin/Council POV
1. a dashboard for graphs, statistics, etc. (e.g. "how many % attendees are members", etc.)
2. view a list of all the MTC members, and their relevant details like membership expiry, etc.
3. cook the text documentation of completed/upcoming competitions and workshops
4. view attendance of people for competitions and workshops
5. generate certificates for an event, for mass-emailing...?
6. add events and event info onto calendar for members also to see 
7. Event Duty list (which period who and what's their role)
8. event project timeline (with checkboxes)
9. council free hours listing
10. treasury and finances sheet
11. SmartLife volunteering management page (we can ask interested members also to register for volunteering and their preferred dates)

