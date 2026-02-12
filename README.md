# MyBridge Landing Page

Single-page marketing site for MyBridge, following the required information hierarchy:

1. Home
2. About Us
3. Features
4. Benefits
5. Why MyBridge
6. Modules (detailed explanations + graphics)
7. Case Studies
8. Success Stories
9. Integrations
10. Contact Us

Modules open in a modal with comprehensive feature cards, benefit lists, and ideal-use graphics. Real client logos (JK Tyre, Zydus Pharma, ShopKirana, Vasu Chemicals) and integration logos (Zoho, SAP, Microsoft 365, Google Workspace, Slack, Salesforce, QuickBooks, Tally, Microsoft Teams, Oracle) are sourced from their official assets.

## Tech Stack

- React + TypeScript (Vite)
- Chakra UI for layout + components
- Lucide & emoji icons for “graphics” cues

## Getting Started

```bash
npm install
npm run dev    # http://localhost:5173
```

## Production Build

```bash
npm run build
npm run preview
```

All content lives in `src/App.tsx`. Adjust data arrays (modules, benefits, case studies, etc.) to update the page copy.
