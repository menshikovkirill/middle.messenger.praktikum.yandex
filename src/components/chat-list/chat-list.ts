import Block from "../../core/Block";
import { Message } from "../message";

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
};

export default class ChatList extends Block<Props> {
    choosedElem: Block<unknown> | undefined;

    constructor(props: Props) {
        const dialogsComponents = Object.values(props.chatsList).reduce((acc: Record<string, Message>, data) => {
            const component = new Message({
                name: data.name,
                id: data.id,
                message: data.message,
                events: {
                    click: () => { props?.onClick?.(data.id); this.onMessageClick(data.id); },
                },
                active: props.activeId === data.id,
            });

            acc[component._id] = component;
            return acc;
        }, {});

        super({
            ...props,
            inputComponentKeys: Object.keys(dialogsComponents),
            ...dialogsComponents,
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
                    <a href="#">Профиль ></a>
                </div>
                <form class="search">
                    <input name="search" placeholder="Поиск" />
                </form>
                <div>
                    ${this.props?.inputComponentKeys?.map((key) => `{{{ ${key} }}}`).join('')}
                </div>
            </div>
        `;
    }
}
