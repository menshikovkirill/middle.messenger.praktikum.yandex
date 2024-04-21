import Block from "../../core/Block";
import { Messages } from "../messages";

type Props = {
    messageId?: string;
    message?: string;
};

export default class Dialog extends Block<Props> {
    init() {
        this.children = {
            ...this.children,
            Message: new Messages({
                name: 'Kirill',
            }),
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        this.children.Message.setProps({
            name: this.props.message,
        });

        return true;
    }

    render() {
        return `
            {{#if messageId}}<div class="dialog">
            {{{Message}}}
            </div>
            {{else}}<div class="message-screen">
                <p>Выберите чат чтобы отправить сообщение</p>
            </div>{{/if}}
        `;
    }
}
