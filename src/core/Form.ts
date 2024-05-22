import { validateForm } from '../utils/validate';
import Block from './Block';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class FormBlock<T extends Record<string, any> = any> extends Block<T> {
    onEmail() {
        return validateForm(this.children.Email, 'email', 'Email не подходит под условие валидации');
    }

    onLogin() {
        return validateForm(this.children.Login, 'login', 'Логин не подходит под условие валидации');
    }

    onPassword() {
        return validateForm(this.children.Password, 'password', 'Пароль не подходит под условие валидации');
    }

    onSecondName() {
        return validateForm(this.children.SecondName, 'second_name', 'Фамилия не подходит под условие валидации');
    }

    onFirstName() {
        return validateForm(this.children.FirstName, 'first_name', 'Имя не подходит под условие валидации');
    }

    onPhoneName() {
        return validateForm(this.children.Phone, 'phone', 'Телефон не подходит под условие валидации');
    }
}
