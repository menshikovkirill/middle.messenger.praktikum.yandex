import Block from "../../core/Block";
import { StoreType } from "../../types";
import { connect } from "../../utils/connect";

class ChatMessage extends Block {
    render() {
        return `
            <div class="chat-message{{#if my}} my{{/if}}">
                <div>{{name}}</div>
                <div>{{content}}</div>
            </div>
        `;
    }
}

const mapStateToPropsShort = ({ chatsList, loginError } : StoreType) => ({ chatsList, loginError });

export default connect(mapStateToPropsShort)(ChatMessage);
