'use strict';

/**
 * favicon controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::favicon.favicon');
