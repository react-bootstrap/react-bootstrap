Package.describe({
  name: 'firfi:meteor-react-bootstrap',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'React-bootstrap port for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Firfi/meteor-react-bootstrap',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'METEOR.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.5');
  api.use('reactjs:react@0.2.1');
  api.use('twbs:bootstrap@3.3.4', 'client');
  api.addFiles('dist/react-bootstrap.js');
  api.export(['ReactBootstrap']);
});

Package.onTest(function(api) {

});
