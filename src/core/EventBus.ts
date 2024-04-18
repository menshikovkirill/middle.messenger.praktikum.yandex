import { EventType } from './Block';

type CallbackType = (...args: unknown[]) => unknown

export default class EventBus {
    listeners: Record<string, Array<CallbackType>>;

    constructor() {
        this.listeners = {};
    }

    on(event: EventType, callback: CallbackType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: EventType, callback: CallbackType) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: EventType, ...args: unknown[]) {
        if (!this.listeners[event]) {
            return;
            // throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
