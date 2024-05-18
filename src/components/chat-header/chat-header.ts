import Block from "../../core/Block";
import defaultImg from "../../assets/empty-img.svg";
import { FormChat } from "../form-chat";
import { getInputesValue } from "../../utils/submit";
import { UsersButton } from "../users-button";

type Props = {
    name?: string;
    clickAddUser: (e: Event) => void;
    clickRemoveUser: (e: Event) => void;
    clickRemoveChat: (e: Event) => void;
}

export default class ChatHeader extends Block<Props> {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
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
            <div class="messages">
                <div class="header">
                    <img src="${defaultImg}" />
                    <p>{{name}}</p>
                    <div class="users-button-content">
                        <div>{{{AddUsersButton}}}</div>
                        <div>{{{RemoveUsersButton}}}</div>
                        <div>{{{RemoveChatsButton}}}</div>
                    </div>
                </div>
                // <div class="content">
                //     {{{ChatMessage}}}
                // </div>
                <div class="messages-form">
                    {{{ FormChat }}}
                </div>
            </div>
        `;
    }
}
