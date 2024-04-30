import Block from "../../core/Block";
import { DialogDataMeesage } from "../../pages/chat/chat";
import { Messages } from "../messages";

type Props = {
    messageId?: string;
    name?: string;
    data?: DialogDataMeesage;
};

export default class Dialog extends Block<Props> {
    init() {
        this.children = {
            ...this.children,
            Messages: new Messages({
                name: 'Kirill',
                data: this.props.data,
            }),
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        this.children.Messages.setProps({
            name: this.props.name,
            data: this.props.data,
        });

        return true;
    }

    render() {
        return `
            {{#if messageId}}<div class="dialog">
                {{{Messages}}}
            </div>
            {{else}}<div class="message-screen">
                <p>Выберите чат чтобы отправить сообщение</p>
            </div>{{/if}}
        `;
    }
}
