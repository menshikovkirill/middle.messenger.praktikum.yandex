import Block from "../../core/Block";
import { getInputesValue } from "../../utils/submit";
import { ChatMessagesList } from "../chat-messages-list";
import { FormChat } from "../form-chat";
import { UsersButton } from "../users-button";
import defaultImg from "../../assets/empty-img.svg";
import {
    ChatDTO,
    StoreType,
    UserDTO,
    WebSocketData,
    UsersList as UsersListProps,
} from "../../types";
import { connect } from "../../utils/connect";
import { UsersList } from "../users-list";
import { ChatMessage } from "../chat-message";
import { ProfileImage } from "../profile-image";

type Props = {
    messageId?: number | null;
    activeChat: ChatDTO | null;
    usersTitle: string;
    token: string;
    socket: WebSocket;
    userData: UserDTO;
    usersList: UsersListProps;
    clickAddUser: (e: Event) => void;
    clickRemoveUser: (e: Event) => void;
    clickRemoveChat: (e: Event) => void;
    clickAddImage: (e: Event) => void;
};

class Dialog extends Block<Props> {
    private messagesList: Array<WebSocketData> = [];

    init() {
        const onSubmitBind = this.onSubmit.bind(this);
        this.children = {
            ...this.children,
            UsersList: new UsersList({
                title: '',
            }),
            ProfileImage: new ProfileImage({
                profileImage: this.props.userData.avatar,
                chat: true,
                onPopupToggle: this.props.clickAddImage,
                events: {
                    click: this.props.clickAddImage,
                },
            }),
            ChatMessagesList: new ChatMessagesList({
                data: [],
            }),
            FormChat: new FormChat({
                events: {
                    submit: onSubmitBind,
                },
            }),
            AddUsersButton: new UsersButton({
                text: '+',
                events: {
                    click: this.props.clickAddUser,
                },
            }),
            RemoveUsersButton: new UsersButton({
                text: '-',
                events: {
                    click: this.props.clickRemoveUser,
                },
            }),
            RemoveChatsButton: new UsersButton({
                text: 'Удалить чат',
                asText: true,
                events: {
                    click: this.props.clickRemoveChat,
                },
            }),
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps.activeChat?.avatar !== newProps.activeChat?.avatar) {
            this.children.ProfileImage.setProps({
                profileImage: newProps.activeChat?.avatar,
                defaultImg,
            });
        }

        if (oldProps.usersTitle !== newProps.usersTitle || oldProps.token !== newProps.token) {
            this.children.UsersList.setProps({
                title: `${newProps.activeChat?.title} - ${newProps.usersTitle}`,
            });

            if (newProps.token) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newProps.socket.addEventListener('message', (event: any) => {
                    try {
                        const message = JSON.parse(event.data) as WebSocketData | Array<WebSocketData>;
                        if ('length' in message && message.length > 0) {
                            this.messagesList = [...message, ...this.messagesList];
                            this.children.ChatMessagesList.setProps({
                                data: this.chatMessagesToMapComponents(this.messagesList),
                            });
                        } else if ('type' in message && message.type === 'message') {
                            this.messagesList = [message, ...this.messagesList];
                            this.children.ChatMessagesList.setProps({
                                data: this.chatMessagesToMapComponents(this.messagesList),
                            });
                        }
                    } catch (error) {
                        window.store.set({
                            loginError: error,
                        });
                    }
                });

                newProps.socket.addEventListener('close', () => {
                    this.children.ChatMessagesList.setProps({
                        data: [],
                    });
                    this.messagesList = [];
                });
            }

            return true;
        }

        return false;
    }

    chatMessagesToMapComponents(data: Array<WebSocketData>) {
        return data.map(({ content, user_id }) => new ChatMessage({
            content,
            name: this.props.usersList[Number(user_id)],
            my: this.props.userData.id === Number(user_id),
        }));
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const values = getInputesValue(this.children.FormChat as FormChat, e);

        if (values) {
            this.props.socket.send(JSON.stringify({
                content: values.message,
                type: 'message',
            }));
            this.children.FormChat.children.Text.setProps({
                value: '',
            });
        }

        return false;
    }

    render() {
        return `
            {{#if activeChat}}<div class="dialog">
                <div class="messages">
                    <div class="header">
                        {{{ProfileImage}}}
                        {{{UsersList}}}
                        <div class="users-button-content">
                            <div>{{{AddUsersButton}}}</div>
                            <div>{{{RemoveUsersButton}}}</div>
                            <div>{{{RemoveChatsButton}}}</div>
                        </div>
                    </div>
                    <div class="content">
                        {{{ChatMessagesList}}}
                    </div>
                    <div class="messages-form">
                        {{{ FormChat }}}
                    </div>
                </div>
            </div>
            {{else}}<div class="message-screen">
                <p>Выберите чат чтобы отправить сообщение</p>
            </div>{{/if}}
        `;
    }
}

const mapStateToPropsShort = ({
    activeChat,
    loginError,
    usersTitle,
    userData,
    socket,
    token,
    usersList,
} : StoreType) => ({
    activeChat,
    loginError,
    usersTitle,
    userData,
    socket,
    token,
    usersList,
});

export default connect(mapStateToPropsShort)(Dialog as typeof Block);
