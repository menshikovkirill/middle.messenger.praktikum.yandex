import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import profileImage from './assets/empty-img.svg';

type PagesType = keyof typeof Pages;

const pages = {
    LoginPage: [Pages.LoginPage],
    RegistrationPage: [Pages.RegistrationPage],
    NavigatePage: [Pages.NavigatePage],
    ChatPage: [Pages.ChatPage],
    NotFound: [Pages.NotFound],
    ServerError: [Pages.ServerError],
    Profile: [Pages.Profile, {
        FormD: true,
        name: 'Kirill',
        email: 'menshikov-kir@yandex.ru',
        login: 'menshikov-kir',
        firstName: 'Кирилл',
        secondName: 'Меньшиков',
        displayName: 'Kirill',
        phone: '+7 (909) 967 30 30',
        profileImage,
    }],
    // profilePassword: [Pages.ProfilePassword, {
    // profileImage,
} as Record<PagesType, any[]>;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template);
});

function navigate(page: PagesType) {
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('LoginPage'));

document.addEventListener('click', (e) => {
  const target = e?.target as HTMLInputElement;
  const page = target?.getAttribute('page') as PagesType;

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
