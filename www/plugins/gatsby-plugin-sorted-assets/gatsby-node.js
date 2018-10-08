const StatsPlugin = require('./stats-extractor-plugin');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage !== 'build-javascript') return;

  actions.setWebpackConfig({
    plugins: [new StatsPlugin()],
  });
};
