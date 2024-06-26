/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    interface Window {
        router: any;
        store: any;
    }

    interface Element {
        style: CSSStyleDeclaration
    }

    interface EventTarget {
        location: any;
    }
}
