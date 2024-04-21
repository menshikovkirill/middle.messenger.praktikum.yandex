import Block from "../../core/Block";
import defaultImg from "../../assets/empty-img.svg";

export default class Messages extends Block {
    render() {
        return `
            <div class="messages">
                <div class="header">
                    <img src="${defaultImg}" />
                    <p>{{name}}</p>
                </div>
                <div class="content">

                </div>
                <div class="form">
                    <form>
                        <input
                            tabindex=0
                            value=""
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Ввеите сообщение"
                            autocomplete="off"
                        >
                        <button>Отправить сообщение</button>
                    </form>
                </div>
            </div>
        `;
    }
}
