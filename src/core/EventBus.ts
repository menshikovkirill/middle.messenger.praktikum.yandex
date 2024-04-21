import Block from './Block';

export type Events = keyof typeof Block.EVENTS;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackType = (...args: any[]) => any

export default class EventBus {
    listeners: Record<string, Array<CallbackType>>;

    constructor() {
        this.listeners = {};
    }

    on(event: Events, callback: CallbackType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: Events, callback: CallbackType) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: Events, ...args: unknown[]) {
        if (!this.listeners[event]) {
            return;
            // throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
