/** @type {import('next-sitemap').IConfig} */
export default {
  // GitHub Pages is the canonical host for this site. `www.hyperse.net` serves
  // a different app and does not proxy `/pipeline`, so it must not be used here.
  siteUrl: 'https://hyperse-io.github.io/pipeline',
  changefreq: 'weekly',
  priority: '0.5',
  generateIndexSitemap: false,
  exclude: ['/icon.svg'],
};
