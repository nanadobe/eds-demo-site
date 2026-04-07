/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCarouselParser from './parsers/hero-carousel.js';
import cardsSpotlightParser from './parsers/cards-spotlight.js';
import tabsNewsParser from './parsers/tabs-news.js';
import heroBannerParser from './parsers/hero-banner.js';
import cardsAboutParser from './parsers/cards-about.js';
import cardsBannerParser from './parsers/cards-banner.js';

// TRANSFORMER IMPORTS
import marubeniCleanupTransformer from './transformers/marubeni-cleanup.js';
import marubeniSectionsTransformer from './transformers/marubeni-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-carousel': heroCarouselParser,
  'cards-spotlight': cardsSpotlightParser,
  'tabs-news': tabsNewsParser,
  'hero-banner': heroBannerParser,
  'cards-about': cardsAboutParser,
  'cards-banner': cardsBannerParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Corporate homepage with hero carousel, news feed, card grids, and promotional banners',
  urls: [
    'https://www.marubeni.com/jp/',
  ],
  blocks: [
    {
      name: 'hero-carousel',
      instances: ['.p-home__hero'],
    },
    {
      name: 'cards-spotlight',
      instances: ['.p-home__spotlight .c-card-list'],
    },
    {
      name: 'tabs-news',
      instances: ['.p-home__news .c-tabs'],
    },
    {
      name: 'hero-banner',
      instances: ['.p-home__message'],
    },
    {
      name: 'cards-about',
      instances: ['.p-home__about .c-card-list'],
    },
    {
      name: 'cards-banner',
      instances: ['.p-home__banner.c-card-list'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: '.p-home__hero',
      style: null,
      blocks: ['hero-carousel'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Spotlight Cards',
      selector: '.p-home__spotlight',
      style: null,
      blocks: ['cards-spotlight'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'News Section',
      selector: '.p-home__news',
      style: null,
      blocks: ['tabs-news'],
      defaultContent: ['.p-home__news-heading', '.p-home__news-more'],
    },
    {
      id: 'section-4',
      name: 'Important Notice',
      selector: '.p-home__important',
      style: null,
      blocks: [],
      defaultContent: ['.p-home__important'],
    },
    {
      id: 'section-5',
      name: 'Presidents Message',
      selector: '.p-home__message',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'About Marubeni',
      selector: '.p-home__about',
      style: 'dark',
      blocks: ['cards-about'],
      defaultContent: ['.p-home__about-heading'],
    },
    {
      id: 'section-7',
      name: 'Banner Grid',
      selector: '.p-home__banner',
      style: null,
      blocks: ['cards-banner'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  marubeniCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [marubeniSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
