import Block from "../../core/Block";
import { getChatsList } from "../../services/chat";
import { StoreType } from "../../types";
import { connect } from "../../utils/connect";
import { Button } from "../button";
import { Message } from "../message";
import { UsersButton } from "../users-button";

type ChatsListProps = {
    id: string,
    name: string,
    image: string,
    message: string,
};

type Props = {
    chatsList: Array<ChatsListProps>;
    onClick?: (id:string) => void;
    inputComponentKeys?: string[],
    activeId?: string | null,
    clickAddChat?: (e: Event) => void;
    clickRemoveChat?: (e: Event) => void;
    AddChatsButton?: Block;
    RemoveChatsButton?: Block;
};

class ChatList extends Block<Props> {
    choosedElem: Block<unknown> | undefined;

    constructor(props: Props) {
        super({
            ...props,
            AddChatsButton: new UsersButton({
                text: '+',
                events: {
                    click: props.clickAddChat,
                },
            }),
            RemoveChatsButton: new UsersButton({
                text: '-',
                events: {
                    click: props.clickRemoveChat,
                },
            }),
        });
    }

    onMessageClick(id: string) {
        if (this.choosedElem) {
            this.choosedElem.setProps({
                active: false,
            });
        }

        const choosedElem = Object.values(this.children).filter((elem) => (elem.props as ChatsListProps).id === id);
        if (choosedElem) {
            this.choosedElem = choosedElem[0] as Block<unknown>;
            this.choosedElem.setProps({
                active: true,
            });
        }
    }

    render() {
        return `
            <div class="chat-list">
                <div class="profile-link">
                    <div class="buttons">{{{ AddChatsButton }}} {{{ RemoveChatsButton }}} </div>
                    <a href="profile">Профиль ></a>
                    {{{B}}}
                </div>
                <form class="search">
                    <input name="search" placeholder="Поиск" />
                </form>
                <div>
                    <div>{{{ chatsList }}}</div>
                </div>
                <div>{{{cards}}}</div>
            </div>
        `;
    }
}
const mapStateToPropsShort = ({ chatsList, loginError } : StoreType) => ({ chatsList, loginError });

export default connect(mapStateToPropsShort)(ChatList);
