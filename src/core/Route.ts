import Block from "./Block";

type Props = { rootQuery?: string | null; }

class Route {
    private _pathname: string;

    private readonly _blockClass: Block;

    private readonly _props: Props;

    private _block: Block | null;

    constructor(pathname: string, view: Block, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    _renderDom(query: string, block: Block | null) {
        if (block) {
            const root = document.querySelector(query);
            root?.append(block?.getContent());
        }
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            this._renderDom(this._props.rootQuery || '', this._block);
            return;
        }

        this._block.show();
    }
}

export default Route;
