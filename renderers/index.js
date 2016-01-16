'use strict';

/**
 * Dependencies
 */

import error from './error';
import plain from './plain';
import map from './map';

const renderers = { map, plain, error };

export default renderers;
