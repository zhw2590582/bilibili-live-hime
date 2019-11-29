import CSP from 'csp-generator';
import 'crx-hotreload';

const manifest = chrome.runtime.getManifest();
chrome.webRequest.onHeadersReceived.addListener(
    details => {
        const header = details.responseHeaders.find(event => {
            const name = event.name.toLowerCase();
            return name === 'content-security-policy-report-only' || name === 'content-security-policy';
        });

        if (header && header.value) {
            const csp = new CSP(header.value);
            csp.append('worker-src', 'blob:');
            csp.append('script-src', '*.baidu.com');
            csp.append('img-src', '*.baidu.com');
            header.value = csp.generate();
        }

        return { responseHeaders: details.responseHeaders };
    },
    { urls: manifest.content_scripts[0].matches },
    ['blocking', 'responseHeaders'],
);
