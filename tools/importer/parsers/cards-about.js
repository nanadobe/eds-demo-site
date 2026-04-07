/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-about. Base: cards.
 * Source: https://www.marubeni.com/jp/
 * Selector: .p-home__about .c-card-list
 * Structure: Cards block - each row: [image, title+link]
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.c-card-list__item');
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('.c-card-list__image img');
    const link = item.querySelector('.c-card-list__link');
    const labelEl = item.querySelector('.c-icon-link__label');

    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    const textCell = [];
    if (link && labelEl) {
      const a = document.createElement('a');
      a.href = link.href || link.getAttribute('href') || '';
      a.textContent = labelEl.textContent.trim();
      textCell.push(a);
    }

    if (imageCell.length > 0 || textCell.length > 0) {
      cells.push([imageCell.length > 0 ? imageCell : '', textCell.length > 0 ? textCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-about', cells });
  element.replaceWith(block);
}
