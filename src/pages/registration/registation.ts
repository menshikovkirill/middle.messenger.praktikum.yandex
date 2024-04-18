import { Form } from "../../components";
import { FormRegistration } from "../../components/form-registation";
import Block from "../../core/Block";

export default class RegistrationPage extends Block {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
            FormLogin: new Form({
                title: 'Регистрация',
                type: "with-shadow",
                formBody: new FormRegistration({}),
                events: {
                    submit: onSubmitBind,
                },
            }),
        };
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const isValidated = (this.children.FormLogin.children.formBody as FormRegistration).onCheck();

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
