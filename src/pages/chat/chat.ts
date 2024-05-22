import {
    Dialog,
    Form,
    Popup,
    ChatList,
    Message,
    FormProfileImage,
} from "../../components";
import Block from "../../core/Block";
import { ChatUsersForm } from "../../components/chat-users-form";
import { getInputesValue } from "../../utils/submit";
import { checkAuthForChat } from "../../services/auth";
import { togglePopup } from "../../utils/popup";
import { ChatAddItemForm } from "../../components/chat-add-form";
import {
    addNewUser,
    createChat,
    removeChat,
    removeUser,
    setActiveChat,
    updateAvatar,
} from "../../services/chat";
import { connect } from "../../utils/connect";
import {
    ChatDTO,
    Login,
    StoreType,
    UserDTO,
} from "../../types";

type Props = {
    activeId: number | null;
    chatsList: Array<ChatDTO>;
    usersTitle: string;
    click: (e: Event) => void;
    userData: UserDTO;
    socket?: WebSocket;
};

class ChatPage extends Block<Props> {
    messageId?: number;

    chats: Array<number> = [];

    componentDidMount() {
        checkAuthForChat();
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
        const onSubmitImageBind = this.onSubmitImage.bind(this);
        const onPopupImageToggleBind = this.onPopupImageToggle.bind(this);

        this.children = {
            ...this.children,
            ChatList: new ChatList({
                onClick: onMessageClickBind,
                activeId: this.messageId,
                clickAddChat: onPopupAddChatToggleBind,
                clickRemoveChat: onPopupRemoveChatToggleBind,
            }),
            Dialog: new Dialog({
                messageId: this.messageId,
                chat: null,
                clickAddUser: onPopupAddUserToggleBind,
                clickRemoveUser: onPopupRemoveUserToggleBind,
                clickRemoveChat: onPopupRemoveChatToggleBind,
                clickAddImage: onPopupImageToggleBind,
            }),
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
            }),
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
            }),
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
            }),
            PopupImage: new Popup({
                type: '',
                popupBody: new Form({
                    title: "Загрузите файл",
                    formBody: new FormProfileImage({}),
                    events: {
                        submit: onSubmitImageBind,
                    },
                }),
                click: onPopupImageToggleBind,
            }),
        };
    }

    onSubmitImage(e: Event) {
        e.preventDefault();

        const form = this.children.PopupImage.children.popupBody.getContent() as HTMLFormElement;
        const file = form.querySelector('input')!;

        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        formData.append('avatar', file?.files?.[0]!);
        formData.append('chatId', String(this.messageId));

        updateAvatar(formData);
        togglePopup(this.children.PopupImage, e);
    }

    onPopupImageToggle(e: Event) {
        togglePopup(this.children.PopupImage, e);
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps !== newProps) {
            if (newProps.chatsList?.length) {
                this.children.ChatList.setProps({
                    ...newProps,
                    chatsList: this.chatsListToMapComponents(newProps.chatsList, newProps.activeId),
                });

                return true;
            }
        }

        return false;
    }

    chatsListToMapComponents(list: Array<ChatDTO>, activeId: number | null) {
        return list.map(({
            id,
            title,
            last_message,
            avatar,
        }) => new Message({
            name: title,
            message: last_message?.content,
            avatar,
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

            setActiveChat(
                chat,
                { chatId: String(id) },
                this.props.userData,
                this.props.socket,
            );
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
        ) as Login;

        if (values && this.messageId) {
            addNewUser(values, this.messageId);
            togglePopup(this.children.PopupAddUser, e);
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
            togglePopup(this.children.PopupAddChat, e);
            return true;
        }

        return false;
    }

    onSubmitRemoveUser(e: Event) {
        e.preventDefault();

        const values = getInputesValue(
            this.children.PopupRemoveUser.children.popupBody.children.formBody as ChatUsersForm,
            e,
        ) as Login;

        if (values && this.messageId) {
            removeUser(values, this.messageId);
            togglePopup(this.children.PopupRemoveUser, e);
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
                    {{{ PopupImage }}}
                </div>
            {{/Page}}
        `;
    }
}

const mapStateToPropsShort = ({
    chatsList,
    userData,
    loginError,
    socket,
} : StoreType) => ({
    userData,
    chatsList,
    loginError,
    socket,
});

export default connect(mapStateToPropsShort)(ChatPage as typeof Block);
