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

router.use('/login', Pages.LoginPage)
.use('/registration', Pages.RegistrationPage)
.use('/profile', Pages.Profile)
.use('/chat', Pages.ChatPage)
.use('/', Pages.ChatPage)
.use('/', Pages.NotFound)
.start();
