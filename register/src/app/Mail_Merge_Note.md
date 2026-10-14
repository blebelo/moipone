# Moipone Weekly Visit Report – Mail-Merge Note

**Template:** `Moipone_Weekly_Visit_Report_Template.docx` (A4 landscape, Lexend embedded, logos in page header)
**Sample data:** `Moipone_Sample_Merge_Data.csv` (one report = 40 rows)

## How the template works
Word cannot repeat table rows or nest collections, so the template is built for a **flat, padded, ordered data source** and Word's native `NEXT` field:

- Each of the five daily tables has **8 visitor rows** (5 × 8 = **40 slots per report**).
- The first visitor row uses the current record; every following row begins with `{ NEXT }` before `{ MERGEFIELD Name }`, so it advances one record. The template contains 540 `MERGEFIELD` and 39 `NEXT` fields.
- Therefore **one report consumes exactly 40 consecutive records**. The next report starts at record 41.
- Day-grouping comes from **row order**: records 1–8 fill the Day 1 table, 9–16 Day 2, 17–24 Day 3, 25–32 Day 4, 33–40 Day 5.

## Data-source schema (Excel sheet or CSV, one header row)
| Level | Columns (repeat on **every** row of the report) |
|---|---|
| Report | `Region`, `OrganisationName`, `ReportingPeriod`, `Day1Name`, `Day1Date` … `Day5Name`, `Day5Date`, `ProjectName`, `CompiledBy`, `CompiledBySignature`, `CompiledDate`, `VerifiedBy`, `VerifiedBySignature`, `VerifiedDate` |
| Visit | `Name`, `Surname`, `Address`, `Residence`, `WardNumber`, `IsDisabled`, `IsCsg`, `GenderSexuality`, `DateOfBirth`, `ContactNumber`, `EmailAddress`, `ReasonForVisit`, `VisitDate` |
| Helper (not in template) | `DayNo` (1–5), `SlotNo` (1–8) – for sorting/checking only |

Rules:
1. **Report-level values must be identical on all 40 rows.** Day headings are read after earlier `NEXT`s and the sign-off block after the last, so they would otherwise pick up a different record.
2. **Order rows by `DayNo`, then `SlotNo`.**
3. **Pad every day to exactly 8 rows.** Unused slots keep the report/day columns filled and the visit columns **blank**; they print as empty rows for handwriting. A day with more than 8 visitors needs extra rows in that table (copy a row that starts with `NEXT`, and make the records-per-report count match) or a second report.
4. Store dates and ward numbers as **text** (e.g. `2026-10-05`, `05 Oct 2026`) so Word shows them exactly as typed. Residence: Township / Informal settlement / Hostel. Gender/Sexuality: F, M, L, G, B, T, Q, I, A+.
5. Signature fields are plain text merge fields. Leave blank to sign by hand.

## Executing the merge
1. Open the template in Word → **Mailings → Select Recipients → Use an Existing List** → choose the Excel/CSV file.
2. Confirm the mail-merge type is **Letters** (Start Mail Merge → Letters).
3. Use **Preview Results**. Page 1 should show the header block and Day 1 with the first 8 records.
4. **Finish & Merge → Edit Individual Documents → All**. Each report is 4 pages; the next 40 records produce the next report.
5. Total record count must be a multiple of 40 or the final report will be incomplete.
6. Do not use *Filter* or *Sort* recipients that break the order.

## Validation performed
- `word/document.xml` was parsed: 579 complex fields (`fldChar begin → instrText → separate → result → end`), all balanced: 540 `MERGEFIELD` + 39 `NEXT`; zero `fldSimple`; no `{{ }}` text.
- 33 distinct merge-field names match the specification exactly.
- Package passed the OOXML schema validator and rendered at A4 landscape.
- A merge was **not** run in Word itself in this environment; a quick preview in Word is recommended.
