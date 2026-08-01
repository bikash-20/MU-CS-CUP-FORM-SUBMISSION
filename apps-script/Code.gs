/**
 * MU CSE CUP '26 — Live attendance counter backend
 *
 * This Apps Script web app reads the Google Sheet that FormSubmit.co
 * writes to, and returns a JSON object the Next.js Counter can render
 * directly. No database, no API key — just a published Google Sheet
 * + this script.
 *
 * ----- ONE-TIME SETUP -----
 *
 * 1. In Google Apps Script, replace Code.gs with this file.
 *
 * 2. Bind a Sheet to this script:
 *      Extensions → Apps Script → Triggers (clock icon) → "+ Add Trigger"
 *      But we don't need a trigger for a read-only endpoint.
 *      Instead: click the project title → "Project Settings" → nothing to do.
 *      What we DO need is the Sheet itself:
 *
 *      Easiest: in the editor, click "+" next to Files → "Spreadsheet" →
 *      create a new blank Sheet. Copy its URL — you'll point FormSubmit at it.
 *
 * 3. FormSubmit → connect to that Sheet:
 *      - Go to https://formsubmit.co → activate the dashboard
 *      - Open your RSVP form → Settings → Google Sheets → Connect
 *      - Paste the Sheet URL from step 2
 *      - Save. From now on every RSVP submission appends a row here.
 *
 * 4. Deploy this script as a web app:
 *      - Top right → "Deploy" → "New deployment"
 *      - Type: "Web app"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *      - Click "Deploy" → copy the URL (looks like
 *        https://script.google.com/macros/s/AKfy...../exec)
 *
 * 5. In Vercel → Settings → Environment Variables, add:
 *        NEXT_PUBLIC_RSVP_COUNTER_URL = <paste the /exec URL>
 *      Save → Deployments → Redeploy.
 *
 * The Counter on your site will start showing live numbers within ~30 s.
 * No fake numbers, no "Setup needed" pill — just real RSVPs from the Sheet.
 */

const SHEET_NAME = 'Form Responses'; // default FormSubmit sheet name; change if yours differs

function doGet(e) {
  try {
    const counts = tallyCounts_();
    return json_({ ok: true, source: 'google-sheet', ...counts, at: new Date().toISOString() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  // The Next.js Counter only calls doGet; doPost is here in case you want
  // to POST later. It just routes to doGet.
  return doGet(e);
}

/**
 * Reads the Sheet and returns counts per batch.
 * Sheet columns (case-insensitive match):
 *   batch | gender | sport | attending | email | reason | _submitted_at
 *
 * Returns:
 *   {
 *     counts: { "62": {attending, declined, total}, ... },
 *     totalRsvps: number,
 *     totalAttending: number,
 *     totalDeclined: number
 *   }
 */
function tallyCounts_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2 || lastCol < 1) {
    return emptyCounts_();
  }

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  // Detect two layouts:
  //  (a) "wide" — one row per submission, header row has "batch", "attending", ...
  //  (b) "long" — FormSubmit table export: 2 cols, Name|Value pairs stacked
  // We auto-detect by header inspection.
  const batchIdx = findIdx_(headers, ['batch', 'Batch']);
  const attendingIdx = findIdx_(headers, ['attending', 'Attending', 'attend', 'Attend']);

  const counts = emptyCounts_().counts;

  if (batchIdx >= 0 && attendingIdx >= 0) {
    // Wide layout
    for (const row of data) {
      const batch = String(row[batchIdx] || '').trim();
      const attending = String(row[attendingIdx] || '').trim();
      if (!(batch in counts)) continue;
      if (attending === 'Yes') counts[batch].attending += 1;
      else if (attending === 'No') counts[batch].declined += 1;
      counts[batch].total += 1;
    }
  } else if (headers.length === 2 && /name|value|field/i.test(headers[0]) || headers.length === 2 && /name/i.test(headers[0])) {
    // Long layout: pairs of rows. Each submission is N consecutive rows
    // where col0 is the field name and col1 is the value. Group by detecting
    // a "batch" row, then continue until next "batch".
    let cur = null;
    for (const row of data) {
      const k = String(row[0] || '').toLowerCase().trim();
      const v = String(row[1] || '').trim();
      if (k === 'batch') {
        if (cur && cur.batch in counts) {
          counts[cur.batch].total += 1;
          if (cur.attending === 'Yes') counts[cur.batch].attending += 1;
          else if (cur.attending === 'No') counts[cur.batch].declined += 1;
        }
        cur = { batch: v, attending: '' };
      } else if (cur && (k === 'attending' || k === 'attend')) {
        cur.attending = v;
      }
    }
    if (cur && cur.batch in counts) {
      counts[cur.batch].total += 1;
      if (cur.attending === 'Yes') counts[cur.batch].attending += 1;
      else if (cur.attending === 'No') counts[cur.batch].declined += 1;
    }
  } else {
    // Unknown layout — return zeros rather than guessing
    return emptyCounts_();
  }

  let totalAttending = 0, totalDeclined = 0, totalRsvps = 0;
  for (const b of Object.keys(counts)) {
    totalAttending += counts[b].attending;
    totalDeclined += counts[b].declined;
    totalRsvps += counts[b].total;
  }

  return { counts, totalAttending, totalDeclined, totalRsvps };
}

function emptyCounts_() {
  return {
    counts: {
      '62': { attending: 0, declined: 0, total: 0 },
      '63': { attending: 0, declined: 0, total: 0 },
      '64': { attending: 0, declined: 0, total: 0 },
      '65': { attending: 0, declined: 0, total: 0 },
      '66': { attending: 0, declined: 0, total: 0 }
    },
    totalAttending: 0,
    totalDeclined: 0,
    totalRsvps: 0
  };
}

function findIdx_(headers, candidates) {
  const lower = headers.map(h => h.toLowerCase());
  for (const c of candidates) {
    const i = lower.indexOf(c.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}

function json_(obj) {
  // Wrap in a callback if requested (helps with browser CORS in some setups)
  // Apps Script's ContentService already returns application/json by default
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}