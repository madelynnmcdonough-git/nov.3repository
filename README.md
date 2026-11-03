# Orbit — Consumer Intelligence Laboratory

A React / TypeScript / Vite / D3 application for a Digital Marketing classroom. It processes voluntarily supplied records locally, connects behavioral evidence to tentative consumer interpretations, and keeps raw personal data out of GitHub.

## Start

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:5173/nov.3repository/ . If another preview owns that port, Vite may use 5174. Both ports are allowed by the development extension. Production path: `/nov.3repository/`.

```sh
pnpm test
pnpm package:extension
pnpm build
```

Node 22+, pnpm 10+, and Python 3 (standard library only, for extension ZIP packaging) are required. Application records are held in memory. Reloading clears the profile. There is no demo profile or external AI service.

## Chrome: install once, then connect

1. Download `public/orbit-extension.zip` from the dashboard and unzip it (or select `public/extension` from this project).
2. In Chrome, open `chrome://extensions`, enable Developer mode and select **Load unpacked**. Choose that extension folder.
3. Reload the dashboard in Chrome. Choose **Connect Chrome** → **Approve Chrome permission**. The extension popup requests Chrome's optional history permission.
4. Select a 7/30/90-day history period and choose **Analyze approved history**.

The connector is detected automatically; no extension ID is pasted. Chrome 127+ is required for opening the permission popup. If Chrome cannot open it automatically, click the Orbit icon in Chrome's extension menu. Users can revoke permission and clear Chrome-imported records in Connections & privacy.

**Distribution status:** unpacked developer package only. No extension was installed by the development agent. Real installation and permission prompts require user approval and have not been verified. No Chrome Web Store listing or approval is claimed. See `docs/PRIVACY.md` and `docs/STORE-SUBMISSION.md`.

## Supported voluntary imports

Drag JSON/CSV into Connections & privacy. Extract ZIP exports first; file limit is 25 MB; session limit is 100,000 records. Invalid, future-dated and sensitive-keyword records are excluded; counts are reported.

- Chrome / Takeout: JSON array or `Browser History`, `history`, `records`, or `activity` array. `url` / `titleUrl`, `title`, `time` / `timestamp` / `lastVisitTime` / `time_usec` are recognized.
- Browsing CSV: `url,title,time`. Numeric seconds, milliseconds and Takeout microseconds, or ISO timestamps are accepted. A record counts once; lifetime visitCount is never expanded into fabricated visits.
- Orders: `orders` array or CSV using `product_url,product_name,order_date` or `Product URL,Product Name,Order Date`. Order records require a real product URL and timestamp. Other retailer-specific formats need normalization; they are not silently guessed.
- ChatGPT: `conversations.json`. Only user-role messages are reviewed; assistant messages are excluded. Quotes, quoted lines and code are removed heuristically. These statements are labeled self-reports and do not enter observed browsing scores.
- Catalog JSON: `{"products":[{"name":"Name copied from retailer","url":"https://retailer.example/product","category":"Technology","price":99,"currency":"USD","image":"https://retailer.example/image.jpg"}]}`. Catalog CSV accepts the same headers. Categories: Technology, Style, Home, Outdoors, Entertainment, Travel, Food.

Raw URL credentials, query strings and fragments are removed. Search nodes use only recognizable search-result page titles; raw query strings are not retained. Sensitive filtering is conservative and incomplete; users should review records and delete unwanted entries.

## Features

- Nine sections: overview, interest universe, footprint, shopping style, segments, product discovery, recommendations, AI vs. reality, connections/privacy.
- Interactive force network: website, category, recognized brand, search-title and supplied-product nodes; weighted co-occurrence edges; deterministic weighted label-propagation communities; zoom, pan, drag, type filters, search, keyboard activation and record evidence.
- Radial hourly view, weekday/hour heatmap, activity calendar, category transitions and changes between halves of the observation window. Graph limits: 60 websites, 25 search nodes, 25 product nodes. Calendar: first 366 coverage days.
- Category and brand vocabularies are published in `src/engine.ts`. Domain/time summaries are observations. Category affinity, shopping signals and overlapping segments are tentative rule-based interpretations, not validated psychological measurements.
- Signal scoring needs at least 20 total records and 5 matching records. Convenience and premium/value orientation remain INSUFFICIENT DATA because browsing alone does not support them reliably.
- Feedback displays self-report alongside prediction. Inaccurate category feedback suppresses recommendations without rewriting observed evidence.
- Local source deletion, record deletion, full session reset, permission revocation, analysis-period filters, dark/light themes and responsive layouts.

## Real product discovery and limits

Supply real product names/links manually or import a catalog. The app does not scrape retailers, bypass restrictions, or read retailer accounts. Recommendations score category-matching record share (capped at 95), provide evidence, and link to the actual supplied product page. Product existence is based on the user's supplied source, not independent verification. Imported prices are explicitly **user-provided, not independently verified**. No ratings or availability are invented. External product images load only after a separate user click; that request goes to the stated image host. Automatic discovery, price verification, and page capture through the extension are not implemented.

## Privacy architecture

The extension has only optional `history` permission and a content script restricted to the exact dashboard path and local development URLs. Its worker additionally checks sender extension ID, top frame, origin and path. No external extension messaging, cookies, password APIs, tokens, backend, analytics, cloud AI calls or raw-record persistence are used. The content script returns only requested data to its dashboard tab. A malicious page script on the authorized dashboard origin would share that trust boundary; protect the published application code accordingly.

Extension limits: 10,000 unique URLs and 100,000 actual visits per request. Truncation or page-read failures are reported. Browser history can itself have incomplete coverage. Close/reload each dashboard tab to clear separate in-memory sessions. Revoking permission does not uninstall the extension or delete Chrome's own history.

## Deployment

Repository: https://github.com/madelynnmcdonough-git/nov.3repository

`.github/workflows/deploy.yml` runs tests, packages the extension, builds, and deploys `dist` to Pages from main. Select **GitHub Actions** as the Pages source in repository Settings → Pages. Expected URL after deployment: https://madelynnmcdonough-git.github.io/nov.3repository/ . Confirm the Actions run and live page before reporting deployment success. No real records belong in the repository or build output.

## Verification

`pnpm test` runs 18 unit tests (including a 100,000-record grouping check) and 13 extension mock assertions. Mocks exercise sender restrictions, permission checks, selected periods, actual visit timestamps, sanitization, popup request and revocation. They never read real history. TypeScript and production-build checks are separate. Browser QA checks navigation, themes, connection empty state, and responsive layouts. Real extension installation/history access, live product-price checks and store submission require external/user steps and must not be reported as completed by the automated tests.
