import FormBlock from "../../core/Form";
import { Button } from "../button";
import { Input } from "../input";

export default class FormLogin extends FormBlock {
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
                events: {
                    click: () => this.goToRegistration(),
                },
            }),
        };
    }

    goToRegistration() {
        window.router.go('/registration');
    }

    onCheck() {
        return [
            this.onLogin(),
            this.onPassword(),
        ].filter((x) => !x).length === 0;
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
