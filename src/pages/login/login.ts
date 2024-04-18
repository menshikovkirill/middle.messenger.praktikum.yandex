import { Form } from "../../components";
import { FormLogin } from "../../components/form-login";
import Block from "../../core/Block";

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

    onSubmit(e) {
        e.preventDefault();
        this.children.FormLogin.children.formBody.onCheck();
        const form = e.target;
        const values = {};
        Object.keys(form.elements).forEach(key => {
            let element = form.elements[key];
            if (element.type !== "submit" && element.value) {
                values[element.name] = element.value;
            }
        });
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ FormLogin }}}
            {{/Page}}
        `;
    }
}
