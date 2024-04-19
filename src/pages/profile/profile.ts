import {
    Form,
    PageProfile,
    ProfileImage,
    FormProfile,
} from "../../components";
import Block from "../../core/Block";
import { getInputesValue } from "../../utils/submit";

export type Props = {
    name: string,
    email: string,
    login: string,
    firstName: string,
    secondName: string,
    displayName: string,
    phone: string,
    profileImage?: string
}

export default class ProfilePage extends Block<Props> {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
            PageProfileComp: new PageProfile({
                ProfileImage: new ProfileImage({
                    profileImage: this.props.profileImage,
                }),
                PageProfileBody: new Form({
                    title: this.props.name,
                    formBody: new FormProfile({
                        ...this.props,
                    }),
                    events: {
                        submit: onSubmitBind,
                    },
                }),
            }),
        };
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const values = getInputesValue(
            this.children.PageProfileComp.children.PageProfileBody.children.formBody as FormProfile,
            e,
        );

        if (values) {
            console.log(values);
            return true;
        }

        return false;
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ PageProfileComp }}}
            {{/Page}}
        `;
    }
}
