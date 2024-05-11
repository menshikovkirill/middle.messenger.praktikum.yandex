import {
    Dialog,
    Form,
    Popup,
    ChatList,
} from "../../components";
import Block from "../../core/Block";
import { Props as PopupProps } from '../../components/popup/popup';
import { ChatUsersForm } from "../../components/chat-users-form";
import { getInputesValue } from "../../utils/submit";
import { checkAuthForChat } from "../../services/auth";

type ChatsListProps = {
    id: string,
    name: string,
    image: string,
    message: string,
}

export type DialogDataMeesage = Array<{
    message: string; my: boolean;
}>

export interface DialogData {
    [key: string]: {
        name: string;
        messages: DialogDataMeesage;
    };
}

type Props = {
    activeId: string | null;
    chatsList: Array<ChatsListProps>;
    dialogData: DialogData;
    click: (e: Event) => void;
};

export default class ChatPage extends Block<Props> {
    messageId?: string;

    init() {
        const onMessageClickBind = this.onMessageClick.bind(this);
        const onPopupAddUserToggleBind = this.onPopupAddUserToggle.bind(this);
        const onPopupRemoveUserToggleBind = this.onPopupRemoveUserToggle.bind(this);
        const onSubmitAddUserBind = this.onSubmitAddUser.bind(this);
        const onSubmitRemoveUserBind = this.onSubmitRemoveUser.bind(this);

        checkAuthForChat();

        this.children = {
            ...this.children,
            ChatList: new ChatList({
                chatsList: this.props.chatsList || [],
                onClick: onMessageClickBind,
                activeId: this.messageId,
            }) as Block<unknown>,
            Dialog: new Dialog({
                messageId: this.messageId,
                clickAddUser: onPopupAddUserToggleBind,
                clickRemoveUser: onPopupRemoveUserToggleBind,
            }) as Block<unknown>,
            PopupAddUser: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Добавить пользователя",
                    formBody: new ChatUsersForm({
                        buttonText: "Добавить",
                    }),
                    events: {
                        submit: onSubmitAddUserBind,
                    },
                }),
                click: onPopupAddUserToggleBind,
            }) as Block<unknown>,
            PopupRemoveUser: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Удалить пользователя",
                    formBody: new ChatUsersForm({
                        buttonText: "Удалить",
                    }),
                    events: {
                        submit: onSubmitRemoveUserBind,
                    },
                }),
                click: onPopupRemoveUserToggleBind,
            }) as Block<unknown>,
        };
    }

    onMessageClick(id: string) {
        this.messageId = id;

        this.children.Dialog.setProps({
            messageId: id,
            name: this.props.dialogData?.[id].name,
            data: this.props.dialogData?.[id],
        });
    }

    onPopupAddUserToggle(e: Event) {
        e.preventDefault();
        this.children.PopupAddUser.setProps({
            type: (this.children.PopupAddUser.props as PopupProps).type === 'active' ? '' : 'active',
        });
    }

    onPopupRemoveUserToggle(e: Event) {
        e.preventDefault();
        this.children.PopupRemoveUser.setProps({
            type: (this.children.PopupRemoveUser.props as PopupProps).type === 'active' ? '' : 'active',
        });
    }

    onSubmitAddUser(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupAddUser.children.popupBody.children.formBody as ChatUsersForm,
            e,
        );

        if (values) {
            console.log(values);
            return true;
        }

        return false;
    }

    onSubmitRemoveUser(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupRemoveUser.children.popupBody.children.formBody as ChatUsersForm,
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
                <div class="chat">
                    {{{ ChatList }}}
                    {{{ Dialog }}}
                    {{{ PopupAddUser }}}
                    {{{ PopupRemoveUser }}}
                </div>
            {{/Page}}
        `;
    }
}
