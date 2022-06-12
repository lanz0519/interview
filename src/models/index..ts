
module.exports = function loadModels() {
  require('../db')

  require('./Channel')
  require('./Message')
};