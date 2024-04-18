import Block from "../../core/Block";
import { validateForm } from "../../utils/validate";
import { Button } from "../button";
import { Input } from "../input";

export default class FormLogin extends Block {
    count = 0;

    constructor(props) {
        super(props);
    }

    init() {
        const onLoginBind = this.onLogin.bind(this);
        const onPasswordBind = this.onPassword.bind(this);
        const onEmailBind = this.onEmail.bind(this);
        const onSecondNameBind = this.onSecondName.bind(this);
        const onFirstNameBind = this.onFirstName.bind(this);
        const onPhoneNameBind = this.onPhoneName.bind(this);

        this.children = {
            ...this.children,
            Email: new Input({
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "Почта",
                events: {
                    blur: onEmailBind,
                },
            }),
            Login: new Input({
                name: "login",
                type: "text",
                label: "Login",
                placeholder: "Логин",
                events: {
                    blur: onLoginBind,
                },
            }),
            FirstName: new Input({
                name: "first_name",
                type: "text",
                label: "Name",
                placeholder: "Имя",
                events: {
                    blur: onFirstNameBind,
                },
            }),
            SecondName: new Input({
                name: "second_name",
                type: "text",
                label: "Surname",
                placeholder: "Фамилия",
                events: {
                    blur: onSecondNameBind,
                },
            }),
            Phone: new Input({
                name: "phone",
                type: "tel",
                label: "Phone",
                placeholder: "Телефон",
                events: {
                    blur: onPhoneNameBind,
                },
            }),
            Password: new Input({
                name: "password",
                type: "password",
                label: "Password",
                placeholder: "Пароль",
                events: {
                    blur: onPasswordBind,
                },
            }),
            PasswordRepeat: new Input({
                name: "passwordrepeat",
                type: "password",
                label: "PasswordRepeat",
                placeholder: "Пароль(еще раз)",
                events: {
                    blur: onPasswordBind,
                },
            }),
            SignUp: new Button({
                label: "Зарегистрироваться",
                type: "primary",
            }),
        };
    }

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

    onCheck() {
        this.onLogin();
        this.onPassword();
        this.onEmail();
        this.onSecondName();
        this.onFirstName();
        this.onPhoneName();

        return [
            this.onLogin(),
            this.onPassword(),
            this.onEmail(),
            this.onSecondName(),
            this.onFirstName(),
            this.onPhoneName(),
        ].filter((x) => !x).length === 0;
    }

    render() {
        return `
            <div class="form-registation">
                {{{ Email }}}
                {{{ Login }}}
                {{{ FirstName }}}
                {{{ SecondName }}}
                {{{ Phone }}}
                {{{ Password }}}
                {{{ PasswordRepeat }}}
                {{{ SignUp }}}
            </div>
        `;
    }
}
