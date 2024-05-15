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
import {
    createChat,
    getChatsList,
    removeChat,
    setActiveChat,
} from "../../services/chat";
import { connect } from "../../utils/connect";
import { ChatDTO, StoreType } from "../../types";

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
    activeId: number | null;
    chatsList: Array<ChatDTO>;
    usersTitle: string;
    dialogData: DialogData;
    click: (e: Event) => void;
};

class ChatPage extends Block<Props> {
    messageId?: number;

    componentDidMount() {
        checkAuthForChat();
        getChatsList();
    }

    init() {
        const onMessageClickBind = this.onMessageClick.bind(this);
        const onPopupAddUserToggleBind = this.onPopupAddUserToggle.bind(this);
        const onPopupRemoveUserToggleBind = this.onPopupRemoveUserToggle.bind(this);
        const onPopupAddChatToggleBind = this.onPopupAddChatToggle.bind(this);
        const onPopupRemoveChatToggleBind = this.onRemoveChat.bind(this);
        const onSubmitAddChatToggleBind = this.onSubmitAddChat.bind(this);
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
                chat: null,
                clickAddUser: onPopupAddUserToggleBind,
                clickRemoveUser: onPopupRemoveUserToggleBind,
                clickRemoveChat: onPopupRemoveChatToggleBind,
            }) as unknown as Block<unknown>,
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
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps !== newProps) {
            this.children.ChatList.setProps({
                ...newProps,
                chatsList: this.chatsListToMapComponents(newProps.chatsList, newProps.activeId),
            });

            return true;
        }

        return false;
    }

    chatsListToMapComponents(list: Array<ChatDTO>, activeId: number | null) {
        return list.map(({ id, title, last_message }) => new Message({
            name: title,
            message: last_message,
            events: {
                click: () => { this.onMessageClick?.(id); },
            },
            active: activeId === id,
        }));
    }

    onMessageClick(id: number) {
        if (id !== this.messageId) {
            this.messageId = id;

            this.setProps({
                ...this.props,
                activeId: id,
            });

            const chat = this.props.chatsList.filter((chat) => chat.id === id)[0];

            setActiveChat(chat, { chatId: String(id) });

            const title = `${chat?.title} - ${this.props.usersTitle}`;
            this.children.Dialog.setProps({
                messageId: this.messageId,
                chat,
                title,
            });
        }
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

    onRemoveChat() {
        if (this.messageId) {
            removeChat({ chatId: String(this.messageId) });

            this.messageId = undefined;

            this.children.Dialog.setProps({
                messageId: null,
            });
        }
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
                    {{{ PopupAddUser }}}
                    {{{ PopupRemoveUser }}}
                </div>
            {{/Page}}
        `;
    }
}

const mapStateToPropsShort = ({
    chatsList,
    loginError,
    usersTitle,
} : StoreType) => ({ chatsList, loginError, usersTitle });

export default connect(mapStateToPropsShort)(ChatPage);
