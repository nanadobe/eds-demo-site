/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-news. Base: tabs.
 * Source: https://www.marubeni.com/jp/
 * Selector: .p-home__news .c-tabs
 * Structure: Tabs block - each row: [tab label, tab content]
 */
export default function parse(element, { document }) {
  const tabButtons = element.querySelectorAll('.c-tabs__tab');
  const tabPanels = element.querySelectorAll('.c-tabs__panel');
  const cells = [];

  tabButtons.forEach((btn, i) => {
    const label = btn.textContent.trim();
    const panel = tabPanels[i];

    // Build tab content from news items
    const contentCell = [];

    if (panel) {
      const newsItems = panel.querySelectorAll('.c-news__item');
      newsItems.forEach((item) => {
        const dateEl = item.querySelector('.c-news__date');
        const categoryEl = item.querySelector('.c-news__category');
        const titleEl = item.querySelector('.c-news__title');
        const link = item.querySelector('.c-news__link');

        const parts = [];
        if (dateEl) parts.push(dateEl.textContent.trim());
        if (categoryEl) parts.push(categoryEl.textContent.trim());

        const p = document.createElement('p');
        if (parts.length > 0) {
          const dateCatText = document.createTextNode(parts.join(' | ') + ' ');
          p.appendChild(dateCatText);
        }

        if (link) {
          const a = document.createElement('a');
          a.href = link.href || link.getAttribute('href') || '';
          a.textContent = link.textContent.trim();
          p.appendChild(a);
        } else if (titleEl) {
          const span = document.createTextNode(titleEl.textContent.trim());
          p.appendChild(span);
        }

        contentCell.push(p);
      });
    }

    if (contentCell.length > 0) {
      cells.push([label, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-news', cells });
  element.replaceWith(block);
}
