/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-carousel. Base: hero.
 * Source: https://www.marubeni.com/jp/
 * Selector: .p-home__hero
 * Structure: Hero block - Row 1: background image, Row 2: heading/text/CTA
 */
export default function parse(element, { document }) {
  // Extract the first slide's image (mobile fallback)
  const img = element.querySelector('.swiper-slide picture img, .swiper-slide img');

  // Extract the video source for desktop
  const video = element.querySelector('.swiper-slide video source');

  // Extract the link text and URL from the hero overlay
  const heroLink = element.querySelector('.p-home__hero-link a, .c-icon-link');

  const cells = [];

  // Row 1: Background image (or video poster)
  if (img) {
    cells.push([img]);
  }

  // Row 2: Content - link text as heading + CTA
  const contentCell = [];
  if (heroLink) {
    const linkText = heroLink.textContent.trim();
    if (linkText) {
      const heading = document.createElement('h2');
      heading.textContent = linkText;
      contentCell.push(heading);
    }
    // Add the link as CTA
    const cta = document.createElement('a');
    cta.href = heroLink.href || heroLink.getAttribute('href') || '';
    cta.textContent = heroLink.textContent.trim();
    contentCell.push(cta);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-carousel', cells });
  element.replaceWith(block);
}
