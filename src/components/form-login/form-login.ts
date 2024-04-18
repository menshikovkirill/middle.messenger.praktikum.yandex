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

        this.children = {
            ...this.children,
            Login: new Input({
                name: "login",
                type: "text",
                label: "Login",
                placeholder: "Логин",
                events: {
                    blur: onLoginBind,
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
            SubmitButton: new Button({
                label: "Авторизоваться",
                type: "primary",
            }),
            LinkToRegistration: new Button({
                label: "Нет аккаунта?",
                type: "link",
                asLink: true,
            }),
        };
    }

    onLogin() {
        validateForm(this.children.Login, 'login', 'Логин не подходит под условие валидации');
    }

    onPassword() {
        validateForm(this.children.Password, 'password', 'Пароль не подходит под условие валидации');
    }

    onCheck() {
        this.onLogin();
        this.onPassword();
    }

    render() {
        return `
            <div class="form-login">
                {{{ Login }}}
                {{{ Password }}}
                {{{ SubmitButton }}}
                {{{ LinkToRegistration }}}
            </div>
        `;
    }
}
