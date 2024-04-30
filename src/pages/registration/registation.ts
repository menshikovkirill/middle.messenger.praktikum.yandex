import { Form, FormRegistration } from "../../components";
import Block from "../../core/Block";
import { getInputesValue } from "../../utils/submit";

export default class RegistrationPage extends Block {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
            FormRegistation: new Form({
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
        const values = getInputesValue(this.children.FormRegistation.children.formBody as FormRegistration, e);

        if (values) {
            console.log(values);
            return true;
        }

        return false;
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ FormRegistation }}}
            {{/Page}}
        `;
    }
}
