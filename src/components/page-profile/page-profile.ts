import Block from "../../core/Block";

export default class PageProfile extends Block {
    render() {
        return `
            <div class="profile">
                <div class="profile-back-button-content">
                    <button></button>
                </div>
                <div class="profile-content">
                    {{{ ProfileImage }}}
                    {{{ PageProfileBody }}}
                </div>
            </div>
        `;
    }
}
