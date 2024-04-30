import { Dialog, SearchFrom } from "../../components";
import Block from "../../core/Block";

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
};

export default class ChatPage extends Block<Props> {
    messageId?: string;

    init() {
        const onMessageClickBind = this.onMessageClick.bind(this);

        this.children = {
            ...this.children,
            Search: new SearchFrom({
                chatsList: this.props.chatsList,
                onClick: onMessageClickBind,
                activeId: this.messageId,
            }) as Block<unknown>,
            Dialog: new Dialog({
                messageId: this.messageId,
            }) as Block<unknown>,
        };
    }

    onMessageClick(id: string) {
        this.messageId = id;

        this.children.Dialog.setProps({
            messageId: id,
            name: this.props.dialogData?.[id].name,
            data: this.props.dialogData?.[id],
        });
    }

    render() {
        return `
            {{#>Page type="center"}}
                <div class="chat">
                    {{{ Search }}}
                    {{{ Dialog }}}
                </div>
            {{/Page}}
        `;
    }
}
