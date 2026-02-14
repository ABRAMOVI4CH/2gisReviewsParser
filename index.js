try {
  module.exports = require('./dist');
} catch (error) {
  const message =
    'Build output not found. Run "npm run build" to generate ./dist before requiring this package.';
  const wrapped = new Error(message);
  wrapped.cause = error;
  throw wrapped;
}
