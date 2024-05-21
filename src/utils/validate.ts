import Block from "../core/Block";

export const validate = (value: string, inputName: string) => {
    switch (inputName) {
        case 'login':
            return value.length >= 3 && value.length <= 20 && /^(?!-+$|_+$)[^0-9]{3,20}$/.test(value);
        case 'password':
            return value.length >= 3 && value.length <= 20 && /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value);
        case 'email':
            return /^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z]{2,}$/.test(value);
        case 'first_name':
            return /^[А-яЁёA-z][а-яёёa-z_-]*$/.test(value);
        case 'second_name':
            return /^[А-яЁёA-z][а-яёёa-z_-]*$/.test(value);
        case 'phone':
            return /^\+?\d{10,15}$/.test(value);
        default:
            return true;
    }
};

export const validateForm = (element: Block<unknown>, ruleName: string, errorMessage: string) => {
    const inputValue = element?.getContent()?.querySelector('input')?.value;
    const check = inputValue && validate(inputValue, ruleName);
    const { props } = element as { props: object };

    if (!check) {
        element.setProps({
            ...props,
            value: inputValue,
            errorMessage,
        });
        return false;
    }

    element.setProps({
        ...props,
        value: inputValue,
        errorMessage: '',
    });

    return true;
};
