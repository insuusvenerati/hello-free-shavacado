'use strict';

/**
 * favicon router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::favicon.favicon');
