export const en = {
  brand: {
    short: 'MU CSE CUP',
    title: "MU CSE CUP '26"
  },
  nav: {
    home: 'Home',
    rsvp: 'RSVP',
    committee: 'Committee',
    openMenu: 'Toggle menu',
    switchLanguage: 'Switch language'
  },
  hero: {
    badge: 'Registrations Open · Aug 2026',
    headline1: 'MU CSE CUP',
    headline2: "'26",
    blurb:
      'The annual inter-batch 5-a-side football tournament for boys plus a girls’ indoor tournament — open to batches {batches}. Pick your batch, RSVP anonymously, or join the organizing committee.',
    ctaPrimary: 'RSVP now',
    ctaSecondary: 'Organizing committee',
    statBatches: 'Batches',
    statEvents: 'Events',
    statCup: 'CUP',
    hostedBy: 'Hosted by',
    hostDept: 'CSE Department',
    hostBatch: 'Batch 62',
    hostWhen: 'August · 2026',
    liveBadge: 'Live · Aug 2026'
  },
  counter: {
    title: 'Live attendance pulse',
    connect: 'Connect a Google Sheet to start streaming live RSVPs.',
    live: '{n} confirmed across all batches. Updates every 30 seconds.',
    waiting: 'Be the first to RSVP — numbers will appear here in real-time.',
    batchLabel: 'Batch {n}',
    attending: 'attending',
    noRsvps: 'no RSVPs yet',
    inOut: '{in} in · {out} out',
    lastRefreshed: 'Last refreshed {time}.',
    liveViaScript: 'Live data via Apps Script.',
    liveViaSheet: 'Live data from the connected Google Sheet.',
    setupHint: 'Set NEXT_PUBLIC_RSVP_COUNTER_URL to stream live counts.',
    status: {
      connecting: 'Connecting',
      setup: 'Setup needed',
      live: 'Live',
      waiting: 'Waiting'
    }
  },
  events: {
    title: 'Event details',
    items: {
      boys: {
        badge: 'Football',
        title: '5-a-side · Boys',
        desc: 'Inter-batch 5-a-side football tournament. Five squads per batch, knockouts, group stage, and a CUP final.'
      },
      girls: {
        badge: 'Indoor',
        title: 'Indoor · Girls',
        desc: "Girls' indoor tournament — a separate event, equally competitive. Pick your sport at RSVP time."
      },
      committee: {
        badge: 'Volunteer',
        title: 'Committee · Batch 62',
        desc: 'Volunteers from the organizing batch plan logistics, brackets, and broadcast. Apply with your beton receipt.'
      }
    }
  },
  cta: {
    rsvpNow: 'RSVP Now',
    joinCommittee: 'Join Organizing Committee'
  },
  faq: {
    badge: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Quick answers about privacy, data, and on-day logistics.',
    items: {
      teams: {
        q: 'How many teams are allowed?',
        a: 'There is no limit. Every batch of the CSE Department is welcome to field one (or more) teams in both the boys’ 5-a-side and the girls’ indoor events. The more teams, the better the day.',
        bullets: {
          squad: 'Squad size: 5 players on the field + up to 3 rolling substitutes per boys’ team; 5 + 2 for girls’ indoor.',
          crossBatch: 'Cross-batch mix: not allowed — each team must belong to a single batch so the standings stay fair.',
          window: 'Registration window: open from announcement day until 24 hours before kickoff. The RSVP form locks after that.',
          walkins: 'Walk-ins on match day: not accepted for players (squads must be pre-registered), but spectators can drop in any time.'
        },
        tail: 'Need to add a teammate or rename your squad after submitting? Ping the organizing committee on {email} and they’ll update the Sheet for you.'
      },
      anonymous: {
        q: 'Is the RSVP really anonymous?',
        a: 'Yes. Form 1 doesn’t ask for your name, ID, or any identifier — only batch, gender, event, and whether you’re attending. Your email is optional and only used if you want a confirmation receipt.'
      },
      security: {
        q: 'Who handles security at the event?',
        a: 'All security matters are reserved and handled by the organizing committee. On-site arrangements, crowd control, medical standby, and player welfare are managed end-to-end by the Batch 62 organizing committee. Players and spectators don’t need to worry about a thing — just show up and play.'
      },
      data: {
        q: 'How is my data stored?',
        a: 'Form submissions are emailed to the organizer via FormSubmit.co and mirrored to a private Google Sheet for live attendance counts. No third-party trackers, no analytics, no public database.'
      },
      duplicate: {
        q: 'What if I submit twice?',
        a: 'The RSVP form remembers your browser via localStorage and blocks a second submission. If you need to correct your response, clear the site’s data or use the “I want to submit anyway” link on the form page.'
      },
      edit: {
        q: 'Can I edit my RSVP after submitting?',
        a: 'Not directly from the site — to keep the form zero-backend and fully anonymous, there’s no lookup step. If something needs to change, email the organizing committee and they’ll update the Sheet for you.'
      }
    }
  },
  footer: {
    tagline:
      'Inter-batch 5-a-side + girls’ indoor tournament organized by the students of the CSE Department, MU.',
    quickLinks: 'Quick links',
    rsvp: 'RSVP',
    committee: 'Committee form',
    contact: 'Contact',
    organizingBatch: 'Organizing Batch: 62',
    credit: '© 2026 MU CSE CUP. Written & built by',
    author: 'BIKASH TALUKDER'
  },
  rsvpPage: {
    title: 'RSVP',
    subtitle: 'Pick your batch and event. No name, no ID — just a quick yes or no.',
    formTitle: 'Tell us if you’re in',
    eyebrow: 'Form 1 · Anonymous',
    heroTitle: "RSVP for MU CSE CUP '26",
    heroSubtitle: 'Pick your batch and tell us if you’re in. No account needed.'
  },
  committeePage: {
    title: 'Organizing committee',
    subtitle: 'Volunteer with Batch 62 to plan logistics, brackets, and broadcast.',
    heroHostedBy: 'Hosted by',
    heroTitle: 'CSE Department · Batch 62',
    heroDate: 'August · 2026',
    heroLive: 'Live · Aug 2026'
  },
  rsvpForm: {
    fields: {
      batch: 'Batch',
      gender: 'Gender',
      sport: 'Event',
      attending: 'Are you attending?',
      reason: 'Why not? (optional)',
      email: 'Email (optional — for confirmation)'
    },
    placeholders: {
      batch: 'Select your batch',
      gender: 'Select gender',
      sport: 'Select event',
      attending: 'Pick one',
      reason: 'A short reason helps us plan better…',
      email: 'you@example.com'
    },
    options: {
      male: 'Male',
      female: 'Female',
      yes: 'Yes',
      no: 'No',
      boysFootball: '5-a-side Football (Boys)',
      girlsIndoor: 'Girls Indoor'
    },
    submit: 'Submit RSVP',
    submitting: 'Submitting…',
    submitAnother: 'Submit another response',
    successTitle: 'You’re in. See you on the pitch.',
    successBody:
      'Your RSVP was recorded. The live counter updates every 30 seconds. Bring friends, pick your squad.',
    againTitle: 'Already submitted',
    againBody:
      'This browser has already RSVPed. If you need to fix something, clear the site’s data or use the “I want to submit anyway” link below.',
    anyway: 'I want to submit anyway',
    errorMissing: 'Form endpoint not configured.',
    errorNetwork: 'Submission failed ({status}). Try again.',
    lockedNotice: 'Submissions are locked 24 hours before kickoff.'
  },
  committeeForm: {
    fields: {
      name: 'Full name',
      studentId: 'Student ID',
      email: 'Email',
      experience: 'Relevant experience (optional)',
      receipt: 'Beton / payment receipt (image or PDF)'
    },
    hints: {
      receipt:
        'Photo or PDF of last month’s beton payment. Uploaded privately to FormSubmit.',
      experience:
        'Events organized, committees served, anything relevant. Optional but helps us assign roles.'
    },
    placeholders: {
      name: 'Your full name',
      studentId: 'e.g. 221-15-462',
      email: 'you@example.com',
      experience: 'Events, clubs, anything useful…'
    },
    submit: 'Submit application',
    submitting: 'Submitting…',
    successTitle: 'Application received.',
    successBody:
      'A confirmation has been sent to {email}. The organizing committee will review your receipt and reach out within 48 hours.',
    notice:
      'Confirmation will be sent to your email. Receipt goes to bikashtalukder040@gmail.com.',
    pickFile: 'Browse',
    noFile: 'Click to upload — JPG, PNG or PDF (max 10 MB)',
    errorMissing: 'Form endpoint not configured.',
    errorNetwork: 'Submission failed ({status}). Try again.'
  },
  lang: {
    en: 'English',
    bn: 'বাংলা',
    shortEn: 'EN',
    shortBn: 'বাংলা'
  }
} as const;

export type Dictionary = typeof en;