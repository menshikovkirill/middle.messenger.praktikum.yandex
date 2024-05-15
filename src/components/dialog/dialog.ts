import Block from "../../core/Block";
import { getInputesValue } from "../../utils/submit";
import { ChatMessage } from "../chat-message";
import { FormChat } from "../form-chat";
import { Messages } from "../messages";
import { UsersButton } from "../users-button";
import defaultImg from "../../assets/empty-img.svg";
import { ChatDTO, StoreType } from "../../types";
import { connect } from "../../utils/connect";
import { UsersList } from "../users-list";

type Props = {
    messageId?: number | null;
    chat: ChatDTO | null;
    usersTitle: string;
    clickAddUser: (e: Event) => void;
    clickRemoveUser: (e: Event) => void;
    clickRemoveChat: (e: Event) => void;
};

class Dialog extends Block<Props> {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);
        this.children = {
            ...this.children,
            UsersList: new UsersList({
                title: '',
            }) as Block<unknown>,
            Messages: new Messages({
                clickAddUser: this.props.clickAddUser,
                clickRemoveUser: this.props.clickRemoveUser,
                clickRemoveChat: this.props.clickRemoveChat,
            }) as Block<unknown>,
            ChatMessage: new ChatMessage({
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

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps.usersTitle === newProps.usersTitle) {
            return false;
        }

        this.children.UsersList.setProps({
            title: newProps.usersTitle,
        });

        return true;
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const values = getInputesValue(this.children.FormChat as FormChat, e);

        if (values) {
            return true;
        }

        return false;
    }

    render() {
        return `
            {{#if messageId}}<div class="dialog">
                <div class="messages">
                    <div class="header">
                        <img src="${defaultImg}" />
                        {{{UsersList}}}
                        <div class="users-button-content">
                            <div>{{{AddUsersButton}}}</div>
                            <div>{{{RemoveUsersButton}}}</div>
                            <div>{{{RemoveChatsButton}}}</div>
                        </div>
                    </div>
                    <div class="content">
                        {{{ChatMessage}}}
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
} : StoreType) => ({ activeChat, loginError, usersTitle });

export default connect(mapStateToPropsShort)(Dialog);
