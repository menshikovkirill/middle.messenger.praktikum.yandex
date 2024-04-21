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
        name: 'Kirill',
        email: 'menshikov-kir@yandex.ru',
        login: 'menshikov-kir',
        firstName: 'Кирилл',
        secondName: 'Меньшиков',
        displayName: 'Kirill',
        phone: '+79099673030',
        profileImage,
    }],
    ProfilePassword: [Pages.ProfilePassword, { profileImage, name: 'Кирилл' }],
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<PagesType, Array<any>>;

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template);
});

function navigate(page: PagesType) {
  const [Source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (Source instanceof Object) {
    const pageSource = new Source(context);
    container.innerHTML = '';
    container.append(pageSource.getContent());
    return;
  }

  container.innerHTML = Handlebars.compile(Source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('ChatPage'));

document.addEventListener('click', (e) => {
  const target = e?.target as HTMLInputElement;
  const page = target?.getAttribute('page') as PagesType;

  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
