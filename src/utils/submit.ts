interface Props {
    onCheck: () => boolean;
}

export const getInputesValue = <T extends Props>(element: T, e?: Event, target?: HTMLFormElement) => {
    const isValidated = element.onCheck();

    if (isValidated) {
        const form = target || e?.target as HTMLFormElement;
        const values: Record<string, string> = {};
        Object.keys(form?.elements).forEach((key) => {
            const input = form?.elements[key as unknown as number] as HTMLInputElement;
            if (input.type !== "submit" && input.value) {
                values[input.name] = input.value;
            }
        });

        return values;
    }

    return false;
};
