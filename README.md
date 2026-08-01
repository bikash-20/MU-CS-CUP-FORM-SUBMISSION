# MU CSE CUP '26

Inter-batch 5-a-side football + girls' indoor tournament landing & registration.

- **Anonymous RSVP** (all batches, boys + girls)
- **Committee form** (Batch 62 organizers only — identity + receipt upload)
- **Backend**: zero-backend — [FormSubmit.co](https://formsubmit.co) handles submissions, file uploads and auto-reply emails for free.
- **Email**: organizer notified at `bikashtalukder040@gmail.com`; submitters get an auto-confirmation email.
- **Deploy**: Vercel (auto-deploy from GitHub repo `bikash-20/MU-CS-CUP-FORM-SUBMISSION`).

## Stack

| Layer       | Choice                                    |
| ----------- | ----------------------------------------- |
| Framework   | Next.js 14 (App Router, TypeScript)       |
| Styling     | Tailwind CSS + custom glassmorphic theme  |
| Animation   | framer-motion hover/scroll effects        |
| Forms       | Native `<form>` POST → FormSubmit.co      |
| Hosting     | Vercel                                    |
| Repo        | github.com/bikash-20/MU-CS-CUP-FORM-SUBMISSION |

## Routes

- `/` — Hero, event info, live attendance counter
- `/rsvp` — Anonymous RSVP form (Form 1)
- `/committee` — Organizing committee form (Form 2)

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How FormSubmit.co is wired

FormSubmit is a free, no-account service. Each `<form>` posts to `https://formsubmit.co/<email>` and FormSubmit:

1. Sends the organizer (`bikashtalukder040@gmail.com`) a formatted table of the submission
2. Accepts file uploads (used for the beton receipt photo in Form 2)
3. Sends an auto-reply to the submitter's email when `_autoresponse` is set
4. First submission triggers a one-time "confirm this email" link — click it once and you're done

Hidden inputs used on every form:

```html
<input type="hidden" name="_subject" value="New MU CSE CUP Registration">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_autoresponse" value="Thanks for registering for MU CSE CUP '26!">
```

For the committee form, `enctype="multipart/form-data"` is added so the receipt photo uploads through FormSubmit.

## Deploy to Vercel

The repo already has `vercel.json` configured. Push to GitHub → Vercel auto-builds on every push to `main`.

```bash
git init
git add .
git commit -m "feat: scaffold MU CSE CUP '26"
git branch -M main
git remote add origin https://github.com/bikash-20/MU-CS-CUP-FORM-SUBMISSION.git
git push -u origin main
```

Then in the Vercel dashboard: import the repo, framework auto-detect = Next.js, deploy. Done.