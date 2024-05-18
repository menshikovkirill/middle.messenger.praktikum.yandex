import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import profileImage from './assets/empty-img.svg';
import Router from './core/Router';
import { Store } from './core/Store';
import { StoreType } from './types';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template);
});

window.store = new Store({
    isLoading: false,
    loginError: null,
    userData: {
        avatar: profileImage,
    },
} as StoreType);

const router = new Router('#app');
window.router = router;

router.use('/', Pages.LoginPage)
.use('/sign-up', Pages.RegistrationPage)
.use('/settings', Pages.Profile)
.use('/messenger', Pages.ChatPage)
.use('/', Pages.NotFound)
.start();
