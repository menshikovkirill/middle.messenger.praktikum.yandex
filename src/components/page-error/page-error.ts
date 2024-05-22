import Block from "../../core/Block";

export default class PageError extends Block {
    render() {
        return (
            `
                {{#>Page type="center"}}
                    <div class="page-error">
                        <div class="code">{{code}}</div>
                        <div class="description">{{description}}</div>
                        <a href="/chat" class="back-link">Назад к чатам</a>
                    </div>
                {{/Page}}
            `
        );
    }
}
