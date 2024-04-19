import { Form, FormLogin } from "../../components";
import Block from "../../core/Block";
import { getInputesValue } from "../../utils/submit";

export default class LoginPage extends Block {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
            FormLogin: new Form({
                title: 'Вход',
                type: "with-shadow",
                formBody: new FormLogin({}),
                events: {
                    submit: onSubmitBind,
                },
            }),
        };
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const values = getInputesValue(this.children.FormLogin.children.formBody as FormLogin, e);

        if (values) {
            console.log(values);
            return true;
        }

        return false;
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ FormLogin }}}
            {{/Page}}
        `;
    }
}
