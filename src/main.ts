import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import profileImage from './assets/empty-img.svg';

const pages = {
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  nav: [Pages.NavigatePage],
  chat: [Pages.ChatPage],
  notFound: [Pages.NotFound],
  serverError: [Pages.ServerError],
  profile: [Pages.Profile, {
    formDisabled: true,
    name: 'Kirill',
    email: 'menshikov-kir@yandex.ru',
    login: 'menshikov-kir',
    firstName: 'Кирилл',
    secondName: 'Меньшиков',
    displayName: 'Kirill',
    phone: '+7 (909) 967 30 30',
    profileImage,
  }],
  profilePassword: [Pages.ProfilePassword, {
    profileImage,
  }],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
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

document.addEventListener('DOMContentLoaded', () => navigate('registration'));

document.addEventListener('click', (e) => {
  const target = e?.target as HTMLInputElement;
  const page = target?.getAttribute('page');

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
