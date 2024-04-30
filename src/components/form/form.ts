import Block from "../../core/Block";

export default class Form extends Block {
    render() {
        return (
            `
            <form class="form {{type}}">
                <div class="title">{{title}}</div>
                <div>{{{ formBody }}}</div>
            </form>
            `
        );
    }
}
