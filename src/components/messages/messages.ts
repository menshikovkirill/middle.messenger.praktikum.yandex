import Block from "../../core/Block";
import defaultImg from "../../assets/empty-img.svg";
import { ChatMessage } from "../chat-message";
import { DialogDataMeesage } from "../../pages/chat/chat";
import { FormChat } from "../form-chat";
import { getInputesValue } from "../../utils/submit";

type Props = {
    data?: {
        name?: string,
        messages?: DialogDataMeesage;
    }
}

export default class Messages extends Block {
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
