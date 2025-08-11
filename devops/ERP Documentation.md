This is a documentation for the MTC ERP "Micromanager".
View the "ERP Proposed Options" document for more info on the available options on the tech stack, payment gateway, etc. The chosen tech stack is PHP + [WordPress](https://wordpress.org), hosted on [InfinityFree](https://infinityfree.com).

---

# Documentation

### Some theory
- InfinityFree has a concept of "profile", which is what you log into. Under a profile, you can create three "accounts", where each "account" is dedicated for one website.
- InfinityFree comes with [cPanel](https://cpanel.net), which is a very popular admin panel for managing webservers.
- InfinityFree also provides FTP access. Its credentials are provided in the InfinityFree dashboard.
- We have installed WordPress into the website, which is a content management system. Its most important features include security and account management.
- We'll be creating a WordPress Theme. A WordPress Theme dictates the content that appears on your website. We'll effectively design our own content, functionality, pages, etc. under this "theme".

### Some quick links
- ERP: https://erp.mtcbpdc.org
- InfinityFree login: https://dash.infinityfree.com/login
- WordPress admin page login: http://erp.mtcbpdc.org/wp-admin

### Terminology
Some terminology we defined for consistency across our communication:

1. There are **3** types of "events":
	- Workshop
	- Competitions/Contests
	- Talks

2. There are **4** types of "people":
	- 🟥 has no account
	- 🟨 has account but NOT a paying member
	- 🟩 has account and is a paying member
	- is council (i.e. admin)

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

---

# Database schema (tables)
(PK = Primary Key)

1. list of MTC ERP account holders
    - *(str, PK)* email/username
    - *(str)* name
    - *(str)* `user_login` (for correlating with WordPress's own accounts table)
    - *(str)* phone number
    - *(date)* join date
    - *(bool)* paid or not?
    - *(date)* membership expiry date
    - *(str, optional)* nickname, for showing it in their dashboard :)

2. list of events
    - *(str/int, PK)* event ID (MUST be RANDOMLY GENERATED str/int, to prevent fraud in attendance)
    - *(str)* event title
    - *(date)* start date (also useful for verifying attendance)
    - *(date)* end date (also useful for verifying attendance)
    - *(str)* event type. One of "workshop", "competitions", "talks"
    - *(str)* write-up/description (markdown)
    - *(str)* links (for social posts, etc.)
    - *(str)* path to an image (figure out uploading files into a server side dir using PHP)

3. list of attendances
    - *(str/int, PK)* attendance entry ID
    - *(str/int)* event ID that this attendance corresponds to
    - *(str)* member's email/username that this attendance corresponds to
    - *(date)* date&time of marking attendance
    - *(bool)* verification of attendance. Example, if person is non-member, but pays AED 5 for the workshop, then council will put a `TRUE` here *manually*. If person was already a paying member, store a `TRUE` directly. Default: `FALSE`. This column is mainly to prevent attendance fraud.

4. list of Medium articles
    - *(int, PK)* article ID (any meaningless number, just for sake of primary key)
    - *(str)* article title
    - *(str)* article preview
    - *(str)* link
    - *(date)* date of article (useful for sorting)

---

# Pages and File Structure
Consider the following pages when building the sidebar.
Please adhere to the design in [Figma](https://figma.com/design/DIUJtJA0kSdQJcJA4RgYjs), for consistency. If you have suggestions, please do mention!
👁️ All pages have a "visibility" mentioned. You have to make sure that server will first CHECK the account role (council, member, expired member, not logged in), and accordingly display a Forbidden message, etc.

1. (`index.php`) Landing page
    - 👁️ Visible to anyone, even without account (obviously).
    - Use design on Figma.
    - Only one button, it should say EITHER "sign in" (if not signed in) OR "proceed to dashboard" (if already signed in), and redirect accordingly.

2. (`login.php`) Login page
    - 👁️ Visible to anyone, including council members.
    - Use design on Figma.
	- The actual login mechanism is provided by WordPress, for e.g. using `wp_signon()`.

3. (`home.php`) Dashboard for members
    - Section 1: upcoming events (👁️ Visible to anyone, even without account)
    - Section 2: calendar (👁️ Visible to anyone, even without account)
    - Section 3: stats (👁️ Visible to only PAYING members)
    - Section 4: membership info (👁️ Visible to any account holder)
        - Show "metadata" (name, phone #, email) and "Current membership status".
        - Within "Current membership status", handle aspects such as current status (member or not), payment links, and membership expiry date.

4. (`home-admin.php`) Dashboard for admins
    - 👁️ Visible to ONLY COUNCIL (obviously).
    - (todo for later)

5. (`events.php`) List of past AND upcoming events
    - 👁️ Visible to anyone, even without account.
    - This is only a summary list, like a list of cards that briefly describe each event.
    - Button to toggle between "Only of this A.Y. year" and "all past events".
    - For the upcoming events, provide links to register.
    - For the past events, redirect to Workshop Details page.

6. (`event-details.php`) Full details of a selected workshop
    - 👁️ Visible only to VALID members (i.e. not expired).
	- Show all details, including a relevant image (e.g. poster), whose link will be available in the database table.

7. (`attendance.php`) Attendance LIST, as well as attendance MARKING page
    - `attendance.php` will be used to both view past attendances AND ALSO mark a new one.
    - Purpose 1: View of all past attendances (👁️ Visible to any account holder)
    - Purpose 2: Marking attendance (👁️ Accessible from scanning QR code only, such as `.../attendance.php?event_id=abcxyz`, which will be displayed at the end of event)
    - When attendance is being marked, check for the following:
	    - Ensure it's within the start and end time of the event.
	    - If this account holder is NOT a paying member (or the membership expired), then still add it to the table, but then manual verification of attendance must be done by council only after the person pays 5 AED or whatever. Look at the Database schema, there is a dedicated column to keep track of this.

8. (`certificates.php`) Certificates page
    - 👁️ Visible to any account holder.
    - Ensure that only the certificates for VERIFIED attendances are shown, and mark the unverified ones as "Not verified".

9. Feedback form (it's just gonna be a Google Forms link, no PHP page required here.)

10. (`passport.php`) MTC Passport
    - 👁️ Visible only to VALID members (i.e. paying members, and not expired).
    - For starters, we can do a 3x4 grid design, which is very easy to create using CSS3 Grid layouts, etc. Ask Sreenikethan for a proof of concept.
    - Slots for each event will be filled in date-wise order (latest first). If attendance exists, a sticker will be shown. If not, the slot will be a dimmed-out version of the sticker.
	- I suggest we'll generate it as an image on the server side, since the HTML version can be easily manipulated/exploited in the client-side. Check out PHP's in-built `gd` library.

| Priority | File name                                            | Purpose                                                  |
| -------: | ---------------------------------------------------- | -------------------------------------------------------- |
|        ❗ | `🌐index.php`                                        | landing page                                             |
|        ❗ | `🌐login.php`                                        | simple login page that uses WP's `wp_signon()`           |
|        ❗ | `🌐home.php`                                         | dashboard for members                                    |
|       🔽 | `🌐home-admin.php`                                   | dashboard for admins                                     |
|        ❗ | `🌐events.php`                                       | listing of past and upcoming events                      |
|        ❗ | `🌐event-details.php`                                | details of a selected event                              |
|        ❗ | `🌐attendance.php`                                   | attendance history, as well as marking new attendance    |
|        ❗ | `🌐certificates.php`                                 | listing of certificates                                  |
|       🔽 | `🌐passport.php`                                     | MTC passport                                             |
|       🔽 | `🌐events-api.php`                                   | for integrating with mtcbpdc.org for events and articles |
|          |                                                      |                                                          |
|          | `📂includes/`                                        | for reusable "components"                                |
|        ❗ | `📂includes/🌐sidebar.php`                           | the left sidebar containing the links for every page     |
|          |                                                      |                                                          |
|          | `📂assets/`                                          | images, etc.                                             |
|       ❗ | `📂assets/📂certificates/📷template for event 1.png` | certificate template for event 1                         |
|       ❗ | `📂assets/📂certificates/📷template for event 2.png` | certificate template for event 2                         |
|       ❗ | `📂assets/📂certificates/📷template for event 3.png` | certificate template for event 3                         |
|        ❗ | ...                                                  | ...                                                      |
|       🔽 | `📂assets/📂passport/📷background.png`               | background for passport                                  |
|       🔽 | `📂assets/📂passport/📷sticker for event 1.png`      | sticker for event 1                                      |
|       🔽 | `📂assets/📂passport/📷sticker for event 2.png`      | sticker for event 2                                      |
|       🔽 | `📂assets/📂passport/📷sticker for event 3.png`      | sticker for event 3                                      |
|       🔽 | ...                                                  | ...                                                      |
