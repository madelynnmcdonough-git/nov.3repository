# Chrome Web Store preparation

## Listing draft
- Name: Orbit — Private History Connector
- Version: 1.1.0
- Category: Education
- Single purpose: voluntarily connect Chrome history to a specified classroom consumer intelligence dashboard for local analysis.
- Short description: Share explicitly approved history with your Orbit dashboard for local consumer-behavior analysis.
- Detailed description: Connect Chrome, approve optional history permission, select a period, and inspect evidence-based consumer insights locally. No passwords, cookies, account credentials, analytics or cloud AI services are accessed. Records stay in the dashboard tab's memory. Revoke permission and delete imported data at any time.
- Permission justification: `history` is optional and provides actual visited URLs, titles and visit times. A content script is restricted to the authorized dashboard path to detect the connector and relay explicitly requested data. No broad host access or additional permission APIs are requested.

## Data-use disclosure
Browsing history is accessed only with explicit Chrome permission and a dashboard analysis action. It is transferred locally to that authorized tab; no extension server receives it. No sale, advertising use, creditworthiness use, or unrelated data transfer. The publisher must answer the current Chrome Web Store privacy questions consistently with this implementation.

## Included
Manifest V3, isolated bridge, worker, approval popup, 16/48/128 PNG icons, ZIP package, privacy policy draft and mock tests. No remote executable code.

## Remaining publisher steps
The publisher must enroll in the store, provide a verified support contact, host and review the privacy policy, capture required extension screenshots after an approved real installation, complete declarations, and submit for review. Any fee or legally binding submission needs the publisher's action. Do not show an Install from Store button until a real approved listing is verified. This is a prepared developer package, not an approved or fully submission-verified store listing.
