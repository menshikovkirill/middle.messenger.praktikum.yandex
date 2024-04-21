import { Dialog, SearchFrom } from "../../components";
import Block from "../../core/Block";

type ChatsListProps = {
    id: string,
    name: string,
    image: string,
    message: string,
}

interface DialogData {
    [key: string]: {
      name: string;
      messages: { message: string; my: boolean }[];
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
        });

        this.children.Dialog.setProps({
            message: this.props.dialogData?.[id].name,
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
