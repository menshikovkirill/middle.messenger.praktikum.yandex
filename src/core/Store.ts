import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

export class Store extends EventBus {
    private state = {};

    // eslint-disable-next-line no-use-before-define
    static __instance: Store;

    constructor(defaultState = {}) {
        if (Store.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Store.__instance;
        }
        super();

        this.state = defaultState;
        this.set(defaultState);

        Store.__instance = this;
    }

    public getState() {
        return this.state;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public set(nextState: any) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
