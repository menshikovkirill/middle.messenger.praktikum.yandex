import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus, { Events } from './EventBus';

type MetaType = {
    props?: unknown;
    tagName?: string;
}

export default class Block<T = unknown> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        Updated: 'Updated',
    };

    _element: HTMLElement | null | undefined;

    _meta: MetaType | undefined;

    _id = nanoid(6);

    eventBus: () => EventBus;

    // eslint-disable-next-line no-use-before-define
    children: {[id: string]: Block} = {};

    props: T;

    constructor(propsWithChildren: T) {
        const eventBus = new EventBus();
        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props });
        this.children = children;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT as Events);
    }

    _addEvents() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const events: Record<string, () => void> = (this.props as any).events || {};

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName], true);
        });
    }

    _removeEvents() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const events: Record<string, () => void> = (this.props as any).events || {};

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName], true);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT as Events, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM as Events, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU as Events, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER as Events, this._render.bind(this));
    }

    _createResources() {
        let tagName;
        if (this._meta) {
            tagName = this._meta.tagName;
        }

        this._element = this._createDocumentElement(tagName || '');
    }

    _init() {
        // this._createResources();
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER as Events);
    }

    init() {}

    componentDidMount() {}

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        if (oldProps === newProps) {
            return false;
        }

        return true;
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM as Events);
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (!response) {
            return;
        }
        this._render();
    }

    _getChildrenAndProps(propsAndChildren: T) {
        const children: {[id: string]: Block} = {};
        const props: Record<string, unknown> = {};

        if (!propsAndChildren) {
            return { children, props };
        }

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
        }
        });

        return { children, props };
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props as object, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        this._removeEvents();
        const propsAndStubs = { ...this.props } as Record<string, string>;

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const childrenProps = new Array<Block>();
        Object.entries(propsAndStubs).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                propsAndStubs[key] = value.map((item) => {
                if (item instanceof Block) {
                    childrenProps.push(item);
                    return `<div data-id="${item._id}"></div>`;
                }

                return item;
                }).join('');
            }
        });

        const fragment = this._createDocumentElement('template');

        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = (fragment as HTMLTemplateElement).content.firstElementChild as Element;

        [...Object.values(this.children), ...childrenProps].forEach((child: Block) => {
            const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child._id}"]`);

            stub?.replaceWith(child.getContent() as Node);
        });

        if (this._element) {
            newElement.style.display = this._element.style.display;
            this._element.replaceWith(newElement);
        }

        this._element = newElement as HTMLElement;

        this._addEvents();
    }

    render() {}

    getContent(): HTMLElement {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
            if (
                this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
            ) {
                this.dispatchComponentDidMount();
            }
            }, 100);
        }

        return this.element as HTMLElement;
    }

    _makePropsProxy(props: unknown) {
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                const oldTarget = { ...target };
                // eslint-disable-next-line no-param-reassign
                target[prop] = value;

                // Запускаем обновление компоненты
                self.eventBus().emit(Block.EVENTS.FLOW_CDU as Events, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        }) as unknown as T;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        const elem = this.getContent();
        if (elem) {
            elem.style.display = 'block';
        }
    }

    hide() {
        const elem = this.getContent();
        if (elem) {
            elem.style.display = 'none';
        }
    }
}
