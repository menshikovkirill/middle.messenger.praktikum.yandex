// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { Store } from './src/core/Store';

// jsdom
const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;

global.store = new Store({
    isLoading: false,
    loginError: null,
});
