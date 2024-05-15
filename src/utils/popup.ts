import Block from "../core/Block";
import { Props as PopupProps } from '../components/popup/popup';

export const togglePopup = (comp: Block, e: Event) => {
    e.preventDefault();
    comp.setProps({
        type: (comp.props as PopupProps).type === 'active' ? '' : 'active',
    });
};
