/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "../core/Block";
import { StoreEvents } from "../core/Store";
import isEqual from './isEqual';

type DispatchHundlerType = Record<string, () => void>;

export function connect <T extends Record<string, any>>(mapStateToProps: any, dispatch?: Array<(args: any) => void>) {
    // eslint-disable-next-line func-names
    return function (Component: typeof Block<T>) {
      return class extends Component {
        private onChangeStoreCallback: () => void;

        constructor(props: any) {
            const { store } = window;
            // сохраняем начальное состояние
            let state = mapStateToProps(store.getState());

            super({ ...props, ...state });

            const dispatchHundler: DispatchHundlerType = {};
            Object.entries(dispatch || {}).forEach(([key, hundler]) => {
                dispatchHundler[key] = (...args) => hundler(window.store.set.bind(window.store), ...args);
            });

            this.setProps({ ...dispatchHundler as T });

            this.onChangeStoreCallback = () => {
                // при обновлении получаем новое состояние
                const newState = mapStateToProps(store.getState());

                // если что-то из используемых данных поменялось, обновляем компонент
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }

                // не забываем сохранить новое состояние
                state = newState;
            };

            // подписываемся на событие
            store.on(StoreEvents.Updated, this.onChangeStoreCallback);
        }

    //   componentWillUnmount() {
    //     super.componentWillUnmount();
    //     window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
    //   }
    };
  };
}
