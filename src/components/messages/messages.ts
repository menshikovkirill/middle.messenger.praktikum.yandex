import Block from "../../core/Block";
import defaultImg from "../../assets/empty-img.svg";
import { ChatMessage } from "../chat-message";
import { DialogDataMeesage } from "../../pages/chat/chat";
import { FormChat } from "../form-chat";
import { getInputesValue } from "../../utils/submit";
import { UsersButton } from "../users-button";

type Props = {
    name?: string;
    data?: {
        name: string,
        messages: DialogDataMeesage;
    }
    clickAddUser: (e: Event) => void;
    clickRemoveUser: (e: Event) => void;
}

export default class Messages extends Block<Props> {
    init() {
        const onSubmitBind = this.onSubmit.bind(this);

        this.children = {
            ...this.children,
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
        };
    }

    componentDidUpdate(_oldProps: Props, newProps: Props): boolean {
        if (!newProps.data?.messages) {
            return false;
        }

        this.children.ChatMessage.setProps({
            data: newProps.data?.messages,
        });

        return true;
    }

    onSubmit(e: Event) {
        e.preventDefault();
        const values = getInputesValue(this.children.FormChat as FormChat, e);

        if (values) {
            console.log(values);
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
                    </div>
                </div>
                <div class="content">
                    {{{ChatMessage}}}
                </div>
                <div class="messages-form">
                    {{{ FormChat }}}
                </div>
            </div>
        `;
    }
}
