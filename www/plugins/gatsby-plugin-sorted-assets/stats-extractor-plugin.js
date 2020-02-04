const fs = require(`fs-extra`);
const path = require(`path`);
const uniq = require(`lodash/uniq`);
const chunkSorter = require(`./chunk-sorter`);

const chunkOnlyConfig = {
  assets: false,
  cached: false,
  children: false,
  chunks: true,
  chunkModules: false,
  chunkOrigins: false,
  errorDetails: false,
  hash: false,
  modules: false,
  reasons: false,
  source: false,
  timings: false,
  version: false,
};

module.exports = class StatsExtractor {
  constructor() {
    this.statsPath = path.join(`public`, `sorted-assets.json`);
  }

  sortChunks(stats) {
    const { chunks } = stats.toJson(chunkOnlyConfig);
    return chunkSorter(chunks, stats.compilation.chunkGroups);
  }

  apply(compiler) {
    compiler.hooks.done.tapPromise(
      `gatsby-webpack-stats-extractor`,
      async stats => {
        let assets = { js: [], css: [] };

        const chunks = this.sortChunks(stats);
        const jsonStats = stats.toJson({
          all: false,
          chunkGroups: true,
          chunks: true,
        });
        const groups = jsonStats.namedChunkGroups;

        // eslint-disable-next-line no-restricted-syntax
        for (let chunk of chunks) {
          const [chunkName] = chunk.names || [];
          const chunkGroup = groups[chunkName];

          if (chunkName && chunkGroup) {
            let files = uniq(
              (groups[chunkName].assets || []).filter(f => !f.endsWith(`.map`)),
            );

            files.forEach(file => {
              if (file.endsWith(`.js`))
                assets.js.push({ file, chunkName, rel: `preload` });
              if (file.endsWith(`.css`))
                assets.css.push({ file, chunkName, rel: `preload` });
            });

            Object.entries(chunkGroup.childAssets).forEach(
              ([rel, childAssets]) => {
                childAssets
                  .filter(a => !files.includes(a))
                  .forEach(file => {
                    if (file.endsWith(`.js`))
                      assets.js.push({ rel, file, chunkName });
                    if (file.endsWith(`.css`))
                      assets.css.push({ rel, file, chunkName });
                  });
              },
            );
          }
        }

        await fs.outputJson(this.statsPath, assets);
      },
    );
  }
};
