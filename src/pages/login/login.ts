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

    onSubmit(e: Event) {
        e.preventDefault();
        const isValidated = (this.children.FormLogin.children.formBody as FormLogin).onCheck();

        if (isValidated) {
            const form = e.target as HTMLFormElement;
            const values: Record<string, string> = {};
            Object.keys(form?.elements).forEach(key => {
                let element = form?.elements[key as unknown as number] as HTMLInputElement;
                if (element.type !== "submit" && element.value) {
                    values[element.name] = element.value;
                }
            });

            console.log(values);
        }
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ FormLogin }}}
            {{/Page}}
        `;
    }
}
