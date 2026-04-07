/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: marubeni cleanup.
 * Selectors from captured DOM of https://www.marubeni.com/jp/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent (OneTrust) - from captured DOM: #onetrust-consent-sdk
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '[class*="onetrust"]',
    ]);

    // Remove skip-to-main link - from captured DOM: a.u-visually-hidden[href="#main"]
    const skipLink = element.querySelector('a.u-visually-hidden[href="#main"]');
    if (skipLink) skipLink.remove();
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome - from captured DOM
    // Header: <marubeni-header id="header"> containing <header class="l-header">
    // Footer: <marubeni-footer> containing <footer class="l-footer">
    WebImporter.DOMUtils.remove(element, [
      'marubeni-header',
      '#header',
      'marubeni-footer',
      'footer.l-footer',
      'link',
      'noscript',
      'iframe',
    ]);

    // Remove swiper navigation artifacts (non-authorable UI controls)
    WebImporter.DOMUtils.remove(element, [
      '.swiper-pagination',
      '.swiper-notification',
    ]);

    // Clean up data attributes and event handlers
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-ready');
      el.removeAttribute('data-accordion-collapsed-label');
      el.removeAttribute('data-accordion-expanded-label');
      el.removeAttribute('onsubmit');
    });
  }
}
