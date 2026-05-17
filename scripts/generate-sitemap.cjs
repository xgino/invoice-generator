const fs = require('fs');
const path = require('path');

// Configure your base domain
const BASE_URL = 'https://invoicor.com';

// Note the paths relative to this script's location (assuming /scripts/generate-sitemap.cjs)
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Data file paths — one per programmatic page type
const DATA_SOURCES = [
  {
    name: 'comparisons',
    file: path.join(__dirname, '../src/data/comparisons.json'),
    urlPrefix: '/compare',
    priority: '0.7',
    changefreq: 'weekly',
  },
  {
    name: 'industries',
    file: path.join(__dirname, '../src/data/industries.json'),
    urlPrefix: '/industries',
    priority: '0.7',
    changefreq: 'weekly',
  },
  {
    name: 'templates',
    file: path.join(__dirname, '../src/data/templates.json'),
    urlPrefix: '/templates',
    priority: '0.7',
    changefreq: 'weekly',
  },
];

// Static routes (homepage + key landing pages + category indexes)
// IMPORTANT: only list routes that actually render a real page.
// A 404 in the sitemap hurts SEO worse than a missing URL.
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
  { path: '/compare', priority: '0.8', changefreq: 'weekly' },
  { path: '/industries', priority: '0.8', changefreq: 'weekly' },
  { path: '/templates', priority: '0.8', changefreq: 'weekly' },
];

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  console.log('Generating Sitemap...');
  const currentDate = new Date().toISOString().split('T')[0];
  const xmlUrls = [];

  // 1) Static routes
  staticRoutes.forEach(route => {
    xmlUrls.push(urlEntry(`${BASE_URL}${route.path}`, currentDate, route.changefreq, route.priority));
  });
  console.log(`Added ${staticRoutes.length} static routes.`);

  // 2) Programmatic routes (one block per data source)
  let totalProgrammatic = 0;
  DATA_SOURCES.forEach(source => {
    if (!fs.existsSync(source.file)) {
      console.warn(`⚠️  ${source.name}: could not find ${source.file} — skipping.`);
      return;
    }

    let items;
    try {
      items = JSON.parse(fs.readFileSync(source.file, 'utf8'));
    } catch (err) {
      console.error(`❌ ${source.name}: failed to parse JSON — skipping. ${err.message}`);
      return;
    }

    if (!Array.isArray(items)) {
      console.warn(`⚠️  ${source.name}: data file is not an array — skipping.`);
      return;
    }

    let added = 0;
    items.forEach(item => {
      if (item && typeof item.slug === 'string' && item.slug.length > 0) {
        xmlUrls.push(urlEntry(
          `${BASE_URL}${source.urlPrefix}/${item.slug}`,
          currentDate,
          source.changefreq,
          source.priority
        ));
        added++;
      }
    });

    console.log(`Injected ${added} ${source.name} page${added === 1 ? '' : 's'}.`);
    totalProgrammatic += added;
  });

  // 3) Write out
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join('\n')}
</urlset>
`;

  // Ensure the public directory exists before writing
  const outDir = path.dirname(SITEMAP_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf8');
  console.log(`✅ Sitemap written to ${SITEMAP_PATH}`);
  console.log(`   Total URLs: ${xmlUrls.length} (${staticRoutes.length} static + ${totalProgrammatic} programmatic)`);
}

generateSitemap();
