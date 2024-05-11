import { StoreEvents } from "../core/Store";
import isEqual from './isEqual';

type DispatchHundlerType = Record<string, () => void>;

export function connect(mapStateToProps: any, dispatch?: Array<(args: any) => void>) {
    return function (Component: any) {
      return class extends Component {
        private onChangeStoreCallback: () => void;

        constructor(props: any) {
            const store = window.store;
            // сохраняем начальное состояние
            let state = mapStateToProps(store.getState());

            super({ ...props, ...state });

            const dispatchHundler: DispatchHundlerType = {};
            Object.entries(dispatch || {}).forEach(([key, hundler]) => {
                dispatchHundler[key] = (...args) => hundler(window.store.set.bind(window.store), ...args);
            });

            this.setProps({ ...dispatchHundler });

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

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}