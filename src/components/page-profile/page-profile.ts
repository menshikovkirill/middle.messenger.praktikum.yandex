import Block from "../../core/Block";

export default class PageProfile extends Block {
    render() {
        return `
            <div class="profile">
                <div class="profile-back-button-content">
                    <a href="/chat"></a>
                </div>
                <div class="profile-content">
                    {{{ ProfileImage }}}
                    {{{ PageProfileBody }}}
                </div>
            </div>
        `;
    }
}
