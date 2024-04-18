export const validate = (value: string, inputName: string) => {
    switch (inputName) {
        case 'login':
            return value.length >= 3 && value.length <= 20 && /^(?!-+$|_+$)[^0-9]{3,20}$/.test(value);
        case 'password':
            return value.length >= 3 && value.length <= 20 && /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value);
        default:
            return true;
    }
};

export const validateForm = (element, ruleName, errorMessage) => {
    const inputValue = element.getContent().querySelector('input').value;
    const check = validate(inputValue, ruleName);

    if (!check) {
        element.setProps({
            ...element.props,
            value: inputValue,
            errorMessage,
        });
    } else {
        element.setProps({
            ...element.props,
            value: inputValue,
            errorMessage: '',
        });
    }
};
