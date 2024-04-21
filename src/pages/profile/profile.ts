import {
    Form,
    PageProfile,
    ProfileImage,
    FormProfile,
    Popup,
    FormProfileImage,
} from "../../components";
import { Props as PopupProps } from '../../components/popup/popup';
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
        const onPopupToggleBind = this.onPopupToggle.bind(this);

        this.children = {
            ...this.children,
            PageProfileComp: new PageProfile({
                ProfileImage: new ProfileImage({
                    profileImage: this.props.profileImage,
                    onPopupToggle: onPopupToggleBind,
                    events: {
                        click: onPopupToggleBind,
                    },
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
            Popup: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Загрузите файл",
                    formBody: new FormProfileImage({}),
                }),
                click: onPopupToggleBind,
            }) as Block<unknown>,
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

    onPopupToggle(e: Event) {
        e.preventDefault();
        this.children.Popup.setProps({
            type: (this.children.Popup.props as PopupProps).type === 'active' ? '' : 'active',
        });
    }

    render() {
        return `
            {{#>Page type="center"}}
                {{{ PageProfileComp }}}
                {{{ Popup }}}
            {{/Page}}
        `;
    }
}
