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
import { getUserData } from "../../services/auth";
import { updateAvatars, updateUserData, updateUserPassword } from "../../services/user";
import { StoreType, UserProfile } from "../../types";
import { connect } from "../../utils/connect";
import { getInputesValue } from "../../utils/submit";

export type Props = {
    userData: {
        name: string,
        email: string,
        login: string,
        first_name: string,
        second_name: string,
        display_name: string,
        phone: string,
        avatar?: string
    },
    submit: () => void;
    savePassword: (oldPassword?: string, newPassword?: string) => void;
}

class ProfilePage extends Block<Props> {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);
        const onSavePasswordBind = this.onSavePassword.bind(this);
        const onPopupToggleBind = this.onPopupToggle.bind(this);
        const onSubmitImageBind = this.onSubmitImage.bind(this);

        getUserData();

        this.children = {
            ...this.children,
            PageProfileComp: new PageProfile({
                ProfileImage: new ProfileImage({
                    profileImage: this.props.userData.avatar,
                    onPopupToggle: onPopupToggleBind,
                    events: {
                        click: onPopupToggleBind,
                    },
                }),
                PageProfileBody: new Form({
                    title: this.props.userData.display_name,
                    formBody: new FormProfile({
                        ...this.props,
                        submit: onSubmitBind,
                        savePassword: onSavePasswordBind,
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
                    events: {
                        submit: onSubmitImageBind,
                    },
                }),
                click: onPopupToggleBind,
            }) as Block<unknown>,
        };
    }

    onSubmitImage(e: Event) {
        e.preventDefault();

        const form = this.children.Popup.children.popupBody.getContent() as HTMLFormElement;
        const model = new FormData(form);
        updateAvatars(model);
    }

    onSubmit() {
        const form = this.children.PageProfileComp.children.PageProfileBody.getContent() as HTMLFormElement;
        const values = getInputesValue(
            this.children.PageProfileComp.children.PageProfileBody.children.formBody as FormProfile,
            undefined,
            form,
        );

        if (values) {
            updateUserData(values as UserProfile);
            return true;
        }

        return false;
    }

    onSavePassword(oldPassword?: string, newPassword?: string) {
        if (oldPassword && newPassword) {
            updateUserPassword({ oldPassword, newPassword });
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps.userData !== newProps.userData) {
            this.children.PageProfileComp.children.PageProfileBody.children.formBody.setProps({
                ...newProps,
            });

            this.children.PageProfileComp.children.ProfileImage.setProps({
                profileImage: newProps.userData.avatar,
            });

            this.children.PageProfileComp.children.PageProfileBody.setProps({
                title: newProps.userData.first_name,
            });

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

const mapStateToPropsShort = ({ isLoading, userData }: StoreType) => ({ isLoading, userData });

export default connect(mapStateToPropsShort)(ProfilePage);
