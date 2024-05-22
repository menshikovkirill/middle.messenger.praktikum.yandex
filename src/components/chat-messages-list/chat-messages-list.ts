import Block from "../../core/Block";
import { StoreType } from "../../types";
import { connect } from "../../utils/connect";

class ChatMessagesList extends Block {
    componentDidMount(): void {
        const div = this.getContent();
        div.scrollTo({
            top: div.getBoundingClientRect().bottom,
        });
    }

    render() {
        return `
            <div class="chat-messages">
                {{{ data }}}
            </div>
        `;
    }
}

const mapStateToPropsShort = ({ chatsList, loginError } : StoreType) => ({ chatsList, loginError });

export default connect(mapStateToPropsShort)(ChatMessagesList);
