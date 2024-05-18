import Block from "../../core/Block";
import { StoreType } from "../../types";
import { connect } from "../../utils/connect";

class ChatMessagesList extends Block {
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
