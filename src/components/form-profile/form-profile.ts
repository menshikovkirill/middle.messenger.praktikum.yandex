import FormBlock from "../../core/Form";
import { Props as ProfileProps } from "../../pages/profile/profile";
import { Button } from "../button";
import { Input } from "../input";

export default class FormProfile extends FormBlock<ProfileProps> {
    init() {
        const onEditDataBind = this.onEditData.bind(this);
        const onLoginBind = this.onLogin.bind(this);
        const onEmailBind = this.onEmail.bind(this);
        const onSecondNameBind = this.onSecondName.bind(this);
        const onFirstNameBind = this.onFirstName.bind(this);
        const onPhoneNameBind = this.onPhoneName.bind(this);
        const onSavedDataBind = this.onSavedData.bind(this);

        const {
            email,
            login,
            firstName,
            secondName,
            displayName,
            phone,
        } = this.props;

        this.children = {
            ...this.children,
            Email: new Input({
                style: "vertical",
                name: "email",
                type: "text",
                label: "Email",
                abel: "Email",
                placeholder: "Email",
                value: email,
                isDisabled: true,
                events: {
                    blur: onEmailBind,
                },
            }),
            Login: new Input({
                style: "vertical",
                name: "login",
                type: "text",
                label: "Login",
                placeholder: "Login",
                value: login,
                isDisabled: true,
                events: {
                    blur: onEmailBind,
                },
            }),
            FirstName: new Input({
                style: "vertical",
                name: "first_name",
                type: "text",
                label: "Имя",
                placeholder: "Имя",
                value: firstName,
                isDisabled: true,
                events: {
                    blur: onLoginBind,
                },
            }),
            SecondName: new Input({
                style: "vertical",
                name: "second_name",
                type: "text",
                label: "Фамилия",
                placeholder: "Фамилия",
                value: secondName,
                isDisabled: true,
                events: {
                    blur: onSecondNameBind,
                },
            }),
            DispayName: new Input({
                style: "vertical",
                name: "display_name",
                type: "text",
                label: "Имя в чате",
                placeholder: "Имя в чате",
                value: displayName,
                isDisabled: true,
                events: {
                    blur: onFirstNameBind,
                },
            }),
            Phone: new Input({
                style: "vertical",
                name: "phone",
                type: "tel",
                label: "Телефон",
                placeholder: "Телефон",
                value: phone,
                isDisabled: true,
                events: {
                    blur: onPhoneNameBind,
                },
            }),
            EditData: new Button({
                label: "Изменить данные",
                type: "link left",
                asLink: true,
                events: {
                    click: onEditDataBind,
                },
            }),
            EditPassword: new Button({
                label: "Изменить пароль",
                type: "link left",
                asLink: true,
            }),
            LogOut: new Button({
                label: "Выйти",
                type: "link left red-color",
                asLink: true,
            }),
            Save: new Button({
                label: "Сохранить",
                type: "primary",
                events: {
                    click: onSavedDataBind,
                },
            }),
        };

        this.children.Save.hide();
    }

    toggleInputs(formDisabled: boolean) {
        Object.values(this.children).forEach((elem) => {
            const { props } = elem as { props: object };
            elem.setProps({
                ...props,
                isDisabled: formDisabled,
            });
        });
    }

    onEditData() {
        this.toggleInputs(false);
        this.children.EditData.hide();
        this.children.EditPassword.hide();
        this.children.LogOut.hide();
        this.children.Save.show();
    }

    onSavedData() {
        this.children.EditData.show();
        this.children.EditPassword.show();
        this.children.LogOut.hide();
        this.toggleInputs(true);
        this.children.Save.hide();
    }

    onCheck() {
        return [
            this.onLogin(),
            this.onEmail(),
            this.onSecondName(),
            this.onFirstName(),
            this.onPhoneName(),
        ].filter((x) => !x).length === 0;
    }

    render() {
        return `
            <div class="form-profile">
                {{{ Email }}}
                {{{ Login }}}
                {{{ FirstName }}}
                {{{ SecondName }}}
                {{{ Phone }}}
                {{{ EditData }}}
                {{{ EditPassword }}}
                {{{ LogOut }}}
                {{{ Save }}}
            </div>
        `;
    }
}
