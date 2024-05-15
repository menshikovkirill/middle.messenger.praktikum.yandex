import {
    Dialog,
    Form,
    Popup,
    ChatList,
    Message,
} from "../../components";
import Block from "../../core/Block";
import { ChatUsersForm } from "../../components/chat-users-form";
import { getInputesValue } from "../../utils/submit";
import { checkAuthForChat } from "../../services/auth";
import { togglePopup } from "../../utils/popup";
import { ChatAddItemForm } from "../../components/chat-add-form";
import { createChat, getChatsList } from "../../services/chat";
import { connect } from "../../utils/connect";
import { StoreType } from "../../types";

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

class ChatPage extends Block<Props> {
    messageId?: string;

    componentDidMount() {
        checkAuthForChat();
        getChatsList();
    }

    init() {
        const onMessageClickBind = this.onMessageClick.bind(this);
        const onPopupAddUserToggleBind = this.onPopupAddUserToggle.bind(this);
        const onPopupRemoveUserToggleBind = this.onPopupRemoveUserToggle.bind(this);
        const onPopupAddChatToggleBind = this.onPopupAddChatToggle.bind(this);
        const onPopupRemoveChatToggleBind = this.onPopupRemoveChatToggle.bind(this);
        const onSubmitAddChatToggleBind = this.onSubmitAddChat.bind(this);
        const onSubmitRemoveChatToggleBind = this.onSubmitRemoveChat.bind(this);
        const onSubmitAddUserBind = this.onSubmitAddUser.bind(this);
        const onSubmitRemoveUserBind = this.onSubmitRemoveUser.bind(this);

        this.children = {
            ...this.children,
            ChatList: new ChatList({
                onClick: onMessageClickBind,
                activeId: this.messageId,
                clickAddChat: onPopupAddChatToggleBind,
                clickRemoveChat: onPopupRemoveChatToggleBind,
            }) as unknown as Block<unknown>,
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
            PopupAddChat: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Добавить новый чат",
                    formBody: new ChatAddItemForm({
                        buttonText: "Добавить",
                    }),
                    events: {
                        submit: onSubmitAddChatToggleBind,
                    },
                }),
                click: onPopupAddChatToggleBind,
            }) as Block<unknown>,
            PopupRemoveChat: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Удалить новый чат",
                    formBody: new ChatAddItemForm({
                        buttonText: "Удалить",
                    }),
                    events: {
                        submit: onSubmitRemoveChatToggleBind,
                    },
                }),
                click: onPopupRemoveChatToggleBind,
            }) as Block<unknown>,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps !== newProps) {
            console.log('fefe', newProps);
            this.children.ChatList.setProps({
                ...newProps,
                chatsList: this.toList(newProps.chatsList, newProps.activeId),
            });

            return true;
        }

        return false;
    }

    toList(list, activeId) {
        return list.map(({ id, title, last_message }) => new Message({
            name: title,
            message: last_message,
            events: {
                click: () => { this.onMessageClick?.(id); },
            },
            active: activeId === id,
        }));
    }

    onMessageClick(id: string) {
        this.messageId = id;

        this.setProps({
            ...this.props,
            activeId: id,
        });

        this.children.Dialog.setProps({
            messageId: id,
            name: this.props.dialogData?.[id].name,
            data: this.props.dialogData?.[id],
        });
    }

    onPopupAddUserToggle(e: Event) {
        togglePopup(this.children.PopupAddUser, e);
    }

    onPopupRemoveUserToggle(e: Event) {
        togglePopup(this.children.PopupRemoveUser, e);
    }

    onPopupAddChatToggle(e: Event) {
        togglePopup(this.children.PopupAddChat, e);
    }

    onPopupRemoveChatToggle(e: Event) {
        togglePopup(this.children.PopupRemoveChat, e);
    }

    onSubmitAddUser(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupAddUser.children.popupBody.children.formBody as ChatUsersForm,
            e,
        );

        if (values) {
            return true;
        }

        return false;
    }

    onSubmitAddChat(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupAddChat.children.popupBody.children.formBody as ChatAddItemForm,
            e,
        );

        if (values) {
            createChat({ title: values.name });
            getChatsList();
            return true;
        }

        return false;
    }

    onSubmitRemoveChat(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupRemoveChat.children.popupBody.children.formBody as ChatAddItemForm,
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
                    {{{ PopupAddChat }}}
                    {{{ PopupRemoveChat }}}
                    {{{ PopupAddUser }}}
                    {{{ PopupRemoveUser }}}
                </div>
            {{/Page}}
        `;
    }
}

const mapStateToPropsShort = ({ chatsList, loginError } : StoreType) => ({ chatsList, loginError });

export default connect(mapStateToPropsShort)(ChatPage);
