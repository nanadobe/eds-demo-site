/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner. Base: hero.
 * Source: https://www.marubeni.com/jp/
 * Selector: .p-home__message
 * Structure: Hero block - Row 1: background image, Row 2: text + CTA
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.p-home__message-image img, picture img');
  const description = element.querySelector('.p-home__message-description');
  const ctaLabel = element.querySelector('.c-icon-link__label');
  const link = element.querySelector('.p-home__message-link');

  const cells = [];

  // Row 1: Background image
  if (img) {
    cells.push([img]);
  }

  // Row 2: Description text + CTA link
  const contentCell = [];
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.push(p);
  }
  if (link && ctaLabel) {
    const a = document.createElement('a');
    a.href = link.href || link.getAttribute('href') || '';
    a.textContent = ctaLabel.textContent.trim();
    contentCell.push(a);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
