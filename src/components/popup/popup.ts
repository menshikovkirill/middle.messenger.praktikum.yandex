import Block from "../../core/Block";
import PopupGround from "./popup-ground";

export type Props = {
    type: '' | 'active',
    click: (e: Event) => void;
    popupBody: unknown,
}

export default class Popup extends Block<Props> {
    init() {
        this.children = {
            ...this.children,
            PopupGround: new PopupGround({
                events: {
                    click: this.props.click,
                },
            }),
        };
    }

    render() {
        return `
            <div class="popup-wrapper {{type}}">
                {{{PopupGround}}}
                <div class="popup-content">
                    {{{ popupBody }}}
                </div>
            </div>
        `;
    }
}
