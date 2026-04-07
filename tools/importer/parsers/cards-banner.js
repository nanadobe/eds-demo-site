/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-banner. Base: cards.
 * Source: https://www.marubeni.com/jp/
 * Selector: .p-home__banner.c-card-list
 * Structure: Cards block - each row: [image, title+link]
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.c-card-list__item');
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('.c-card-list__image img');
    const link = item.querySelector('.c-card-list__link');
    const titleEl = item.querySelector('.c-card-list__title');

    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    const textCell = [];
    if (link && titleEl) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href') || '';
      a.textContent = titleEl.textContent.trim();
      textCell.push(a);
    } else if (titleEl) {
      textCell.push(titleEl.textContent.trim());
    }

    if (imageCell.length > 0 || textCell.length > 0) {
      cells.push([imageCell.length > 0 ? imageCell : '', textCell.length > 0 ? textCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-banner', cells });
  element.replaceWith(block);
}
