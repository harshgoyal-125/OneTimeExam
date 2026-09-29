# One-time exam

A 15-question MCQ exam for up to 60 students, with admin question editing, admin-controlled admission, per-attempt 15-minute timer, fullscreen/tab visibility logging and CSV exports. Runs on a free Render web service and MongoDB Atlas. Use Node 20+.

## Configuration
Set `MONGODB_URI` (Atlas database URI), `ADMIN_PASSWORD` (strong secret), `SESSION_SECRET` (32+ random bytes), `PUBLIC_ORIGIN` (exact https://... Render origin), `NODE_ENV=production`. Optional `PORT`. Never commit secrets. Set your Atlas network access and database user in Atlas, and restrict database privileges to this app database. In Render select Free instance, build `npm install`, start `npm start`.

Admin route `/admin`; student entry `/`. Set duration and title, paste an optional allowed roster, add exactly 15 MCQs, and open exam. Close admission after the class joins; attempts already underway may finish. Do not share the admin password. CSV exports contain personal identifiers and must be handled securely. A roster validates college ID and roll number when supplied, but names are self-reported, so check identity separately. Without a roster, anyone with the link may enter self-reported details.

The browser cannot prevent device or app switching, screenshots, or use of a second device. Visibility/fullscreen events are logged, and repeated violations submit the attempt. Loss of network, unsupported browser events and privacy controls can prevent event reporting. A device entering fullscreen does not lock it. Test on every device/browser students will use. Avoid closing admin edits or changing settings mid-exam.

Render Free may sleep and take around a minute to wake; pre-warm before the scheduled start. The server enforces each student's deadline and uses its clock for grading. MongoDB Atlas is durable storage, not Render's ephemeral disk.
