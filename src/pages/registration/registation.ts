import { Form, FormRegistration } from "../../components";
import Block from "../../core/Block";
import { checkAuthForLogin, createUser } from "../../services/auth";
import { CreateUser, StoreType } from "../../types";
import { connect } from "../../utils/connect";
import { getInputesValue } from "../../utils/submit";

class RegistrationPage extends Block {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        checkAuthForLogin();

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
        const values = getInputesValue(this.children
            .FormRegistation.children.formBody as FormRegistration, e) as CreateUser;

        if (values) {
            createUser(values);
            return true;
        }

        return false;
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ FormRegistation }}}
                {{#if isLoading}} Loading...{{/if}}
            {{/Page}}
        `;
    }
}

const mapStateToPropsShort = ({ isLoading }: StoreType) => ({ isLoading });

export default connect(mapStateToPropsShort)(RegistrationPage);
