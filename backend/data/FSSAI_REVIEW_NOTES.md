# FSSAI food business source review notes

**Prepared:** 2026-11-21  
**Status:** Research notes only; no source or extracted claim below is curator-verified.  
**Scope:** India-wide FSSAI registration/licensing information for tea stalls, food stalls, and home bakeries.

This file is outside `backend/data/docs/`, so the app does not ingest these notes as regulatory evidence. The source PDFs listed below are in `docs/`; the app currently treats them as unverified because their entries in `verified_sources.json` explicitly say `unverified`.

## Preliminary findings to check against the originals

### Registration and licence categories

- The FSSAI Gazette amendment dated 10 March 2026 changes the definition of a petty food business operator and adds provisions concerning registration, street vendors, and validity. Its exact scope and interaction with later directions need review.
- FSSAI's order dated 13 March 2026 says revised turnover thresholds take effect on 1 April 2026 and supersede earlier turnover thresholds: registration up to ₹1.5 crore, State licence above ₹1.5 crore through ₹50 crore, and Central licence above ₹50 crore. Do not treat turnover alone as the classification test: activity-specific kinds of business and exceptions appear in the FoSCoS table.
- FoSCoS's eligibility table updated 1 April 2026 describes a “Petty Retailer of snacks/tea shops” and includes temporary or fixed stalls serving snacks, tea, or coffee. It lists an eligibility band for that kind of business. The user still needs the correct kind of business and food category selected; this source does not determine an individual business's classification.
- The same table has separate entries for retail bakery shops, general manufacturing, food vending establishments, and home-based canteens. It does not contain a specific “home bakery” category. A bakery that makes food and a shop that only resells food may map differently. Confirm the actual activity, products, scale, and current FoSCoS classification rather than inferring a category from “home bakery.”
- The FoSCoS eligibility PDF includes fee amounts, but those amounts are not reproduced here. Check the live portal before displaying any fee.

### Street-food vendors

- The March 2026 amendment and its FAQ describe deemed FSSAI registration for street-food vendors, hawkers, carts, and similar businesses already registered under the Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act, 2014. The FAQ also says applicable Schedule 4 hygiene and sanitary requirements continue.
- Do not generalize this provision to every food stall. The separate Street Vendors Act registration/recognition condition and applicable local process must be established for the person's case.

### Application form and documents

- Form A contains fields for applicant identity, correspondence address, business premises/location, food items and quantities, turnover for renewal, intended start date, seasonal dates, water source, and electricity use. The downloaded PDF contains legacy payment language, so it should not be used as the definitive current online checklist.
- FoSCoS exposes a dynamic “documents required” reference and a new-registration path. The required document list depends on the selected kind of business and the current portal. No final supporting-document checklist is approved by these notes.
- Use the current application flow and the kind-of-business document list as the source of truth. Do not add commonly assumed items (for example, an NOC, proof of ownership, or water test) unless the applicable official source and current application flow require them for that case.

### Hygiene material

- FSSAI's Schedule 4 page identifies Part I with registration-level petty food operators and street-food vendors. The locally downloaded 2018 PDF concerns Part II for licensed food businesses and is historical, not a current consolidated Schedule 4.
- The March and June 2026 amendment documents include later regulatory changes. The June Gazette PDF was readable through the official FSSAI source index, but its direct file URL returned 404 during download; it is recorded as a link-only unverified source. Resolve the current Schedule 4 download before using hygiene requirements as current evidence.

### Stale/conflicting official page

FSSAI's official registration landing page still displays the former ₹12 lakh turnover threshold. This conflicts with the later 13 March 2026 order and the FoSCoS eligibility table updated 1 April 2026. The page remains in the source catalog for transparency, marked `unverified`, with a note not to use that old threshold as current guidance.

## Source register

| Local file / source | What it appears to cover | Publication/update date | Current review state |
|---|---|---|---|
| `fssai_licensing_registration_amendment_2026-03-10.pdf` | Gazette amendments: petty food operator definition; street vendor deemed registration; validity and inspection provisions | Gazette dated 2026-03-10; portal listed 2026-03-12 | UNVERIFIED |
| `fssai_revised_turnover_order_2026-03-13.pdf` | Revised turnover categories, effective-date statement, supersession of earlier thresholds | 2026-03-13 | UNVERIFIED |
| `fssai_licensing_amendment_faq_2026-03-27.pdf` | FSSAI's FAQ about the March amendment and threshold order | 2026-03-27 | UNVERIFIED |
| `foscos_kind_of_business_eligibility_2026-04-01.pdf` | Activity-specific eligibility table; tea/snacks, bakery/retail/manufacturing and food-service rows; fees | Updated 2026-04-01 | UNVERIFIED |
| `fssai_registration_form_a.pdf` | Registration form fields and applicant declarations | Date not stated in downloaded PDF | UNVERIFIED; legacy wording present |
| `fssai_schedule4_part_ii_amendment_2018.pdf` | Historical Schedule 4 Part II text for licensed businesses | 2018; exact Gazette date still to confirm | UNVERIFIED; superseding changes need review |
| June 2026 second amendment (link only) | Later changes to manufacturing records and Schedule 4 FIFO/FEFO wording | Gazette dated 2026-06-23; FSSAI listing 2026-06-24 | UNVERIFIED; direct PDF returned 404 |
| FSSAI Hygiene Requirements page | Official Schedule 4 overview/download entry | Current linked-file date not established | UNVERIFIED |
| FoSCoS required-documents page | Dynamic business-type-specific document lists | Dynamic page | UNVERIFIED |

Exact source URLs, retrieval dates, titles, authorities, and review flags are recorded in `official_sources.json` and `verified_sources.json`.

## Review and approve

1. Open each official URL recorded in both JSON files and compare it with the downloaded PDF. Confirm the domain and issuing authority, exact title, Gazette/publication date, and file contents. Keep a record of the reviewer and date.
2. Read the March amendment, March order, March FAQ, April eligibility table, June amendment, and current Schedule 4 together. Resolve conflicts and mark superseded versions as historical. In particular, do not approve the older ₹12 lakh content from FSSAI's registration landing page as current.
3. In FoSCoS, check the live eligibility selector and current required-document list for representative cases: a tea/snacks seller preparing on site; a food stall with temporary/no seating; and a home bakery that manufactures and sells its own products. Record where the cases differ. Confirm the current fees in the portal before adding any fee claim.
4. Approve only content you have reviewed and can support from the primary source. Edit the corresponding exact-filename record in `verified_sources.json`: retain the official URL, title, issuing authority, and retrieval date; set `verification_status` to `verified`; add `verified_at`, `reviewed_by`, and a concise `review_notes` explanation. Do not use a broad approval for unrelated documents.
5. Leave sources `unverified` when a current source cannot be obtained, a date is unclear, two sources conflict, or a business classification remains unresolved. Resolve the June PDF's 404 and identify the current Schedule 4 PDF before approving hygiene details.
6. Restart the backend after changing the manifest. `GET /api/sources` should show a document as verified only after the manifest has the exact filename, complete required metadata, and explicit `verified` status. Do not alter entries to verified merely because a PDF downloaded or text extracted successfully.
