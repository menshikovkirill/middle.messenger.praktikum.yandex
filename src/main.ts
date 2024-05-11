import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import chatsList from './chatsList.json';
import dialogData from './dialogData.json';

import profileImage from './assets/empty-img.svg';
import Router from './core/Router';
import { Store } from './core/Store';

// const pages = {
//     LoginPage: [Pages.LoginPage],
//     RegistrationPage: [Pages.RegistrationPage],
//     NavigatePage: [Pages.NavigatePage],
//     ChatPage: [Pages.ChatPage, {
//         chatsList,
//         activeId: null,
//         dialogData,
//     }],
//     NotFound: [Pages.NotFound],
//     ServerError: [Pages.ServerError],
//     Profile: [Pages.Profile, {
//         name: 'Kirill',
//         email: 'menshikov-kir@yandex.ru',
//         login: 'menshikov-kir',
//         firstName: 'Кирилл',
//         secondName: 'Меньшиков',
//         displayName: 'Kirill',
//         phone: '+79099673030',
//         profileImage,
//     }],
//     ProfilePassword: [Pages.ProfilePassword, { profileImage, name: 'Кирилл' }],
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } as Record<PagesType, Array<any>>;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template);
});

window.store = new Store({
    isLoading: false,
    loginError: null,
    cats: [],
    user: null,
    selectedCard: null,
});

const router = new Router('#app');
window.router = router;

router.use('/login', Pages.LoginPage)
.use('/registration', Pages.RegistrationPage)
.use('/profile', Pages.Profile)
.use('/chat', Pages.ChatPage)
.use('*', Pages.NotFound)
.start();
