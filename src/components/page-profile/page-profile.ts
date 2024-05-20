import Block from "../../core/Block";
import { Link } from "../link";

export default class PageProfile extends Block {
    init() {
        this.children = {
            ...this.children,
            GoToMessenger: new Link({
                text: '',
                go: '/messenger',
            }) as Block<unknown>,
        };
    }

    render() {
        return `
            <div class="profile">
                <div class="profile-back-button-content">
                    {{{ GoToMessenger }}}
                </div>
                <div class="profile-content">
                    {{{ ProfileImage }}}
                    {{{ PageProfileBody }}}
                </div>
            </div>
        `;
    }
}
