'use strict';

/**
 * favicon service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favicon.favicon');
