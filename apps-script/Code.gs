/**
 * MU CSE CUP '26 — Live attendance counter + form intake backend
 *
 * Apps Script web app that does BOTH:
 *   1. Receives form submissions via doPost() and appends a row to the Sheet
 *      (the Next.js form POSTs here in parallel with FormSubmit).
 *   2. Serves live counts via doGet() that the homepage Counter polls every 30s.
 *
 * ----- ONE-TIME SETUP -----
 *
 * 1. In Google Apps Script, replace Code.gs with this file.
 *
 * 2. Bind a Sheet to this script:
 *      In the Apps Script editor, click "+" next to Files -> "Spreadsheet" ->
 *      create a new blank Sheet. Copy its ID from the Sheet URL
 *      (the long string between "/d/" and "/edit") and paste it into
 *      SHEET_ID below.
 *
 *      The Sheet must have a header row. Run initSheet_() once (Run menu in
 *      the Apps Script editor) to write the header row automatically.
 *
 * 3. Deploy this script as a web app:
 *      - Top right -> "Deploy" -> "New deployment"
 *      - Type: "Web app"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *      - Click "Deploy" -> copy the URL (looks like
 *        https://script.google.com/macros/s/AKfy...../exec)
 *
 * 4. In Vercel -> Settings -> Environment Variables, add:
 *        NEXT_PUBLIC_RSVP_COUNTER_URL = <paste the /exec URL>
 *      Save -> Deployments -> Redeploy.
 *
 * 5. The Counter on your site will start showing live numbers within ~30 s.
 *    Every RSVP / Committee submission is sent here too, so the Sheet
 *    stays in sync even if FormSubmit's Google Sheets connector ever lags.
 */

const SHEET_ID = ''; // <-- paste your Google Sheet ID here (between /d/ and /edit in the Sheet URL)
const SHEET_NAME = 'Form Responses'; // change if your sheet tab has a different name

const HEADERS = [
  'submitted_at',
  'form',
  'batch',
  'gender',
  'sport',
  'attending',
  'reason',
  'email',
  'full_name',
  'student_id',
  'organizing_batch',
  'experience'
];

function doGet(e) {
  try {
    const counts = tallyCounts_();
    return json_({ ok: true, source: 'google-sheet', ...counts, at: new Date().toISOString() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * Receives form submissions from the Next.js client.
 * Called via fetch(url, { method: 'POST', mode: 'no-cors', body: formData }).
 *
 * The browser request uses `mode: 'no-cors'`, so we cannot read the parsed
 * JSON or the response body on the client (the response is opaque). That's
 * fine — we just want to write a row. We parse the incoming POST body here:
 *
 *   - If Content-Type is application/json -> JSON.stringify(payload)
 *   - Else -> treat as application/x-www-form-urlencoded and split on & =
 *
 * Unknown fields are silently ignored. Missing required fields are written
 * as empty strings.
 */
function doPost(e) {
  try {
    const payload = parsePayload_(e);
    appendRow_(payload);
    return json_({ ok: true, received: true, form: payload.form || '' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * Builds a header row in the Sheet. Run once from the Apps Script editor
 * (select initSheet_ in the toolbar, click Run).
 */
function initSheet_() {
  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function getSheet_() {
  if (!SHEET_ID) {
    throw new Error('SHEET_ID is not set. Edit Code.gs and paste your Google Sheet ID.');
  }
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
}

function appendRow_(payload) {
  const sheet = getSheet_();
  ensureHeaders_(sheet);
  const row = HEADERS.map((h) => {
    const v = payload[h];
    return v == null ? '' : String(v);
  });
  sheet.appendRow(row);
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasAny = firstRow.some((c) => String(c).trim() !== '');
  if (!hasAny) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function parsePayload_(e) {
  // Prefer JSON if the client sent it as text/plain (Apps Script doesn't
  // populate e.postData.contents for fetch no-cors requests reliably, but
  // it does for text/plain). Otherwise parse urlencoded form-data.
  const raw = (e && e.postData && e.postData.contents) || '';
  const type = (e && e.postData && e.postData.type) || '';

  if (type.indexOf('application/json') >= 0 || (raw && raw.trim().startsWith('{'))) {
    try {
      return JSON.parse(raw);
    } catch (_) {
      // fall through to urlencoded
    }
  }

  const out = {};
  if (!raw) return out;

  // URL-encoded body
  raw.split('&').forEach((pair) => {
    if (!pair) return;
    const eq = pair.indexOf('=');
    const k = decodeURIComponent((eq < 0 ? pair : pair.slice(0, eq)).replace(/\+/g, ' '));
    const v = decodeURIComponent((eq < 0 ? '' : pair.slice(eq + 1)).replace(/\+/g, ' '));
    out[k] = v;
  });
  return out;
}

/**
 * Reads the Sheet and returns counts per batch.
 * Sheet columns (case-insensitive match):
 *   batch | attending | ...
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
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2 || lastCol < 1) {
    return emptyCounts_();
  }

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map((h) => String(h).trim());
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  const batchIdx = findIdx_(headers, ['batch', 'Batch']);
  const attendingIdx = findIdx_(headers, ['attending', 'Attending', 'attend', 'Attend']);
  const formIdx = findIdx_(headers, ['form', 'Form']);

  const counts = emptyCounts_().counts;

  if (batchIdx >= 0 && attendingIdx >= 0) {
    for (const row of data) {
      const batch = String(row[batchIdx] || '').trim();
      const attending = String(row[attendingIdx] || '').trim();
      // Only RSVP rows count toward per-batch attendance. Committee rows have
      // empty attending — ignore them here.
      const form = formIdx >= 0 ? String(row[formIdx] || '').trim() : 'rsvp';
      if (form !== 'rsvp') continue;
      if (!(batch in counts)) continue;
      if (attending === 'Yes') counts[batch].attending += 1;
      else if (attending === 'No') counts[batch].declined += 1;
      counts[batch].total += 1;
    }
  } else {
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
  const lower = headers.map((h) => h.toLowerCase());
  for (const c of candidates) {
    const i = lower.indexOf(c.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}