import { createAttribution } from './cw-application.mjs?v=20261026-matching-1';
import { hostConfig } from './host-config.mjs';

// Install the real host CMP bridge as window.CWConsent before importing this module.
// It must expose isGranted(): boolean and subscribe(callback): unsubscribe, optionally getReceipt().
// Missing adapter deliberately permits the application with no attribution or Meta event.
export const attribution = window.CWAttribution || createAttribution({
  consent: window.CWConsent,
  allowedPaths: hostConfig.allowedPaths,
  onDiagnostic: ({ code }) => console.warn('[CW application]', code),
});
window.CWAttribution = attribution;
attribution.cleanAddressBar();

// Load this module on each website landing/VSL page BEFORE the existing CMP releases Pixel.
// Do not initialize a second Pixel. Site router integrations must call captureVisit() before cleaning.
