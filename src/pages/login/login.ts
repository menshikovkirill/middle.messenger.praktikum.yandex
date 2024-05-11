import { Form, FormLogin } from "../../components";
import Block from "../../core/Block";
import { createUser, login } from "../../services/auth";
import { LoginRequestData } from "../../types";
import { connect } from "../../utils/connect";
import { getInputesValue } from "../../utils/submit";

class LoginPage extends Block {
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
        const values = getInputesValue(this.children.FormLogin.children.formBody as FormLogin, e) as LoginRequestData;

        if (values) {
            console.log(values);
            login(values);
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

const mapStateToPropsShort = ({ loginField, isLoading, loginError }) => ({ loginField, isLoading, loginError });

export default connect(mapStateToPropsShort)(LoginPage);
