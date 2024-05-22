/* eslint-disable camelcase */
import FormBlock from "../../core/Form";
import { Props as ProfileProps } from "../../pages/profile/profile";
import { Button } from "../button";
import { Input } from "../input";
import { logOut } from "../../services/auth";

export default class FormProfile extends FormBlock<ProfileProps> {
    init() {
        const onEditDataBind = this.onEditData.bind(this);
        const onEditPasswordBind = this.onEditPassword.bind(this);
        const onLoginBind = this.onLogin.bind(this);
        const onEmailBind = this.onEmail.bind(this);
        const onSecondNameBind = this.onSecondName.bind(this);
        const onFirstNameBind = this.onFirstName.bind(this);
        const onPhoneNameBind = this.onPhoneName.bind(this);
        const onSavedDataBind = this.onSavedData.bind(this);
        const onSavedPasswordBind = this.onSavePassword.bind(this);
        const logOutBind = this.logOut.bind(this);

        const {
            email,
            login,
            first_name,
            second_name,
            display_name,
            phone,
        } = this.props.userData;

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
                value: first_name,
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
                value: second_name,
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
                value: display_name,
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
            LastPassword: new Input({
                style: "vertical",
                name: "lastpassword",
                type: "password",
                label: "Прошлый паоль",
                placeholder: "Прошлый пароль",
                value: '',
                isDisabled: true,
            }),
            NewPassword: new Input({
                style: "vertical",
                name: "newpassword",
                type: "password",
                label: "Новый пароль",
                placeholder: "Новый пароль",
                value: '',
                isDisabled: true,
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
                events: {
                    click: onEditPasswordBind,
                },
            }),
            LogOut: new Button({
                label: "Выйти",
                type: "link left red-color",
                asLink: true,
                events: {
                    click: logOutBind,
                },
            }),
            Save: new Button({
                label: "Сохранить",
                type: "primary",
                events: {
                    click: onSavedDataBind,
                },
            }),
            SavePassword: new Button({
                label: "Сохранить пароль",
                type: "primary",
                asLink: true,
                events: {
                    click: onSavedPasswordBind,
                },
            }),
        };

        this.children.Save.hide();
        this.children.LastPassword.hide();
        this.children.NewPassword.hide();
        this.children.SavePassword.hide();
    }

    logOut() {
        logOut();
    }

    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        if (oldProps !== newProps) {
            const {
                email,
                login,
                first_name,
                second_name,
                display_name,
                phone,
            } = newProps.userData;

            this.children.Email.setProps({
                value: email,
            });
            this.children.Login.setProps({
                value: login,
            });
            this.children.FirstName.setProps({
                value: first_name,
            });
            this.children.SecondName.setProps({
                value: second_name,
            });
            this.children.DispayName.setProps({
                value: display_name,
            });
            this.children.Phone.setProps({
                value: phone,
            });
        }

        return false;
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

    hideAllInputes() {
        Object.values(this.children).forEach((elem) => {
            elem.hide();
        });
    }

    showAllInputes() {
        Object.values(this.children).forEach((elem) => {
            elem.show('flex');
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
        this.props.submit();
        this.children.EditData.show();
        this.children.EditPassword.show();
        this.children.LogOut.show();
        this.toggleInputs(true);
        this.children.Save.hide();
    }

    onEditPassword() {
        this.toggleInputs(false);
        this.hideAllInputes();
        this.children.LastPassword.show('flex');
        this.children.NewPassword.show('flex');
        this.children.Save.hide();
        this.children.SavePassword.show();
    }

    onSavePassword() {
        const lastPassword = this.children.LastPassword.getContent().querySelector('input')?.value;
        const newPassword = this.children.NewPassword.getContent().querySelector('input')?.value;
        this.props.savePassword(lastPassword, newPassword);
        this.showAllInputes();
        this.children.Save.hide();
        this.children.LastPassword.hide();
        this.children.NewPassword.hide();
        this.children.SavePassword.hide();
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
                {{{ DispayName }}}
                {{{ Phone }}}
                {{{ LastPassword }}}
                {{{ NewPassword }}}
                {{{ EditData }}}
                {{{ EditPassword }}}
                {{{ LogOut }}}
                {{{ Save }}}
                {{{ SavePassword }}}
            </div>
        `;
    }
}
