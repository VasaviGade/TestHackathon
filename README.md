# PermitPath AI

PermitPath is a Hyderabad-first information navigator for tea stalls, food stalls, and home bakeries. It combines a FastAPI backend, React/Vite interface, Gemini responses, multilingual embeddings, and ChromaDB. Regulatory information is informational only; the app does not issue approvals or determine legal applicability.

## Run locally

Requirements: Python 3.10+ and Node.js 18+.

1. Copy `.env.example` to `.env` in the repository root. Add a Gemini API key to enable generated answers. Keep the key in the backend environment; never use a `VITE_` prefix for secrets.
2. Start the API from `backend`:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. In another terminal, start the web app from `frontend`:

   ```powershell
   npm install
   npm run dev
   ```

Open the Vite URL. The default API is `http://localhost:8000`. Set `VITE_API_URL` in the root `.env` only if the API is elsewhere. The API reads the root `.env` as well.

## Knowledge base: review before verification

Place PDFs, Markdown, or UTF-8 text files in `backend/data/docs/`. PDF extraction preserves page numbers; each chunk carries its document name, authority, source link, and verification status into retrieval and citations. Chunks overlap at boundaries. The multilingual embedding model and ChromaDB are loaded on demand. If they are unavailable, retrieval falls back to token matching; results with weak matches are omitted.

The bundled `sample_guidance.md` is demonstration material only. `backend/data/official_sources.json` is a catalog of official-domain leads, not a set of reviewed or verified regulatory documents. The catalog links were checked on 2026-11-21; the actual material's currency and applicability still need review. No official regulatory PDFs are currently included in the local knowledge base.

To mark a local document verified, a maintainer must obtain it from the issuing authority, check that its content is current and applicable, then add an entry keyed by the exact filename in `backend/data/verified_sources.json`:

```json
{
  "documents": {
    "official-document.pdf": {
      "title": "Exact document title",
      "issuing_authority": "Issuing authority",
      "source_url": "https://official.example.gov/document.pdf",
      "retrieved_at": "YYYY-MM-DD",
      "verification_status": "verified",
      "verified_at": "YYYY-MM-DD"
    }
  }
}
```

Only the explicit `verified` status plus all required metadata marks a document verified. Downloading a file or adding its URL is not enough. For an updated official source, review the document text and date, authority, link, and whether its scope covers the user's activity and location. Otherwise it stays unverified. Old list-shaped manifests are treated as unverified.

## API

- `GET /api/health` — service/configuration and indexed-document counts.
- `GET /api/sources` — local document records plus official-source leads and their review status.
- `GET /api/admin/knowledge` — read-only ingestion status for maintainers.
- `POST /api/chat` — grounded answer and page-level citations. Request fields: `question`, `business_type`, `city`, `locality`, `language` (`en` or `te`).
- `POST /api/checklist` — profile-based investigation steps and supplied completion IDs.

Gemini failures return a friendly, source-aware fallback. No API key or exception detail is sent to the browser. Checklist completion is stored in browser local storage. Voice uses browser speech recognition/synthesis if available; text chat remains usable when it is not.

## Configuration

See `.env.example`. The default embedding model is multilingual and may need to download on first retrieval. If model downloads are unavailable, the API logs the issue and attempts lexical retrieval. You can set `RAG_MAX_COSINE_DISTANCE` to tune the vector relevance cutoff and `CORS_ORIGINS` for the allowed browser origins.

### Production deployment

For the Vercel frontend, set the build environment variable `VITE_API_URL` to the public FastAPI base URL, with no trailing slash (for example, `https://testhackathon.onrender.com`). The frontend also defaults to this Render URL if the variable is omitted. Vite embeds `VITE_*` values at build time, so redeploy the frontend after changing it.

For the Render backend, set `CORS_ORIGINS` to a comma-separated list of complete browser origins, including `https://permitpath-ewvdz1vev-vasavigade.vercel.app` (no path or trailing slash). Keep `GEMINI_API_KEY` configured only in Render's backend environment; never add it to a `VITE_*` variable or frontend source. Redeploy/restart the backend after changing its environment.

## Manual smoke check

1. Start both services and open the home page at desktop and mobile widths.
2. Set a tea stall profile, city/locality, and English; open the workspace and check the FSSAI/GHMC investigation items. Mark one complete, navigate away and back, and confirm it remains checked.
3. Ask a question covered by the sample document. Confirm it is labelled unverified and the response shows a source chip. Ask an unrelated question and confirm the assistant reports that evidence is missing instead of presenting a rule.
4. Switch to Telugu; check the translated checklist and send a Telugu question. The answer language follows the selected language when Gemini is configured.
5. Try voice input and playback where the browser provides Telugu/English speech services; confirm text chat still works if either is unavailable.
6. Stop Gemini or omit the API key and repeat a chat request. The API should return a friendly fallback without exposing internals.

## Build the frontend

From `frontend`, run `npm run build`. The build output is ignored by Git.
