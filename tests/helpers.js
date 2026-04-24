const path = require('path');

const localFixtureUrl = () => `file://${path.join(process.cwd(), 'index.html')}`;

module.exports = { localFixtureUrl };
