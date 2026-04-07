var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-carousel.js
  function parse(element, { document }) {
    const img = element.querySelector(".swiper-slide picture img, .swiper-slide img");
    const video = element.querySelector(".swiper-slide video source");
    const heroLink = element.querySelector(".p-home__hero-link a, .c-icon-link");
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    const contentCell = [];
    if (heroLink) {
      const linkText = heroLink.textContent.trim();
      if (linkText) {
        const heading = document.createElement("h2");
        heading.textContent = linkText;
        contentCell.push(heading);
      }
      const cta = document.createElement("a");
      cta.href = heroLink.href || heroLink.getAttribute("href") || "";
      cta.textContent = heroLink.textContent.trim();
      contentCell.push(cta);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-carousel", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-spotlight.js
  function parse2(element, { document }) {
    const items = element.querySelectorAll(".c-card-list__item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector(".c-card-list__image img");
      const link = item.querySelector(".c-card-list__link");
      const titleEl = item.querySelector(".c-card-list__title");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const textCell = [];
      if (link && titleEl) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.textContent = titleEl.textContent.trim();
        textCell.push(a);
      } else if (titleEl) {
        textCell.push(titleEl.textContent.trim());
      }
      if (imageCell.length > 0 || textCell.length > 0) {
        cells.push([imageCell.length > 0 ? imageCell : "", textCell.length > 0 ? textCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-spotlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-news.js
  function parse3(element, { document }) {
    const tabButtons = element.querySelectorAll(".c-tabs__tab");
    const tabPanels = element.querySelectorAll(".c-tabs__panel");
    const cells = [];
    tabButtons.forEach((btn, i) => {
      const label = btn.textContent.trim();
      const panel = tabPanels[i];
      const contentCell = [];
      if (panel) {
        const newsItems = panel.querySelectorAll(".c-news__item");
        newsItems.forEach((item) => {
          const dateEl = item.querySelector(".c-news__date");
          const categoryEl = item.querySelector(".c-news__category");
          const titleEl = item.querySelector(".c-news__title");
          const link = item.querySelector(".c-news__link");
          const parts = [];
          if (dateEl) parts.push(dateEl.textContent.trim());
          if (categoryEl) parts.push(categoryEl.textContent.trim());
          const p = document.createElement("p");
          if (parts.length > 0) {
            const dateCatText = document.createTextNode(parts.join(" | ") + " ");
            p.appendChild(dateCatText);
          }
          if (link) {
            const a = document.createElement("a");
            a.href = link.href || link.getAttribute("href") || "";
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
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse4(element, { document }) {
    const img = element.querySelector(".p-home__message-image img, picture img");
    const description = element.querySelector(".p-home__message-description");
    const ctaLabel = element.querySelector(".c-icon-link__label");
    const link = element.querySelector(".p-home__message-link");
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    const contentCell = [];
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentCell.push(p);
    }
    if (link && ctaLabel) {
      const a = document.createElement("a");
      a.href = link.href || link.getAttribute("href") || "";
      a.textContent = ctaLabel.textContent.trim();
      contentCell.push(a);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-about.js
  function parse5(element, { document }) {
    const items = element.querySelectorAll(".c-card-list__item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector(".c-card-list__image img");
      const link = item.querySelector(".c-card-list__link");
      const labelEl = item.querySelector(".c-icon-link__label");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const textCell = [];
      if (link && labelEl) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.textContent = labelEl.textContent.trim();
        textCell.push(a);
      }
      if (imageCell.length > 0 || textCell.length > 0) {
        cells.push([imageCell.length > 0 ? imageCell : "", textCell.length > 0 ? textCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-about", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-banner.js
  function parse6(element, { document }) {
    const items = element.querySelectorAll(".c-card-list__item");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector(".c-card-list__image img");
      const link = item.querySelector(".c-card-list__link");
      const titleEl = item.querySelector(".c-card-list__title");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const textCell = [];
      if (link && titleEl) {
        const a = document.createElement("a");
        a.href = link.href || link.getAttribute("href") || "";
        a.textContent = titleEl.textContent.trim();
        textCell.push(a);
      } else if (titleEl) {
        textCell.push(titleEl.textContent.trim());
      }
      if (imageCell.length > 0 || textCell.length > 0) {
        cells.push([imageCell.length > 0 ? imageCell : "", textCell.length > 0 ? textCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/marubeni-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        '[class*="onetrust"]'
      ]);
      const skipLink = element.querySelector('a.u-visually-hidden[href="#main"]');
      if (skipLink) skipLink.remove();
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "marubeni-header",
        "#header",
        "marubeni-footer",
        "footer.l-footer",
        "link",
        "noscript",
        "iframe"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".swiper-pagination",
        ".swiper-notification"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-ready");
        el.removeAttribute("data-accordion-collapsed-label");
        el.removeAttribute("data-accordion-expanded-label");
        el.removeAttribute("onsubmit");
      });
    }
  }

  // tools/importer/transformers/marubeni-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-carousel": parse,
    "cards-spotlight": parse2,
    "tabs-news": parse3,
    "hero-banner": parse4,
    "cards-about": parse5,
    "cards-banner": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Corporate homepage with hero carousel, news feed, card grids, and promotional banners",
    urls: [
      "https://www.marubeni.com/jp/"
    ],
    blocks: [
      {
        name: "hero-carousel",
        instances: [".p-home__hero"]
      },
      {
        name: "cards-spotlight",
        instances: [".p-home__spotlight .c-card-list"]
      },
      {
        name: "tabs-news",
        instances: [".p-home__news .c-tabs"]
      },
      {
        name: "hero-banner",
        instances: [".p-home__message"]
      },
      {
        name: "cards-about",
        instances: [".p-home__about .c-card-list"]
      },
      {
        name: "cards-banner",
        instances: [".p-home__banner.c-card-list"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: ".p-home__hero",
        style: null,
        blocks: ["hero-carousel"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Spotlight Cards",
        selector: ".p-home__spotlight",
        style: null,
        blocks: ["cards-spotlight"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "News Section",
        selector: ".p-home__news",
        style: null,
        blocks: ["tabs-news"],
        defaultContent: [".p-home__news-heading", ".p-home__news-more"]
      },
      {
        id: "section-4",
        name: "Important Notice",
        selector: ".p-home__important",
        style: null,
        blocks: [],
        defaultContent: [".p-home__important"]
      },
      {
        id: "section-5",
        name: "Presidents Message",
        selector: ".p-home__message",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "About Marubeni",
        selector: ".p-home__about",
        style: "dark",
        blocks: ["cards-about"],
        defaultContent: [".p-home__about-heading"]
      },
      {
        id: "section-7",
        name: "Banner Grid",
        selector: ".p-home__banner",
        style: null,
        blocks: ["cards-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
