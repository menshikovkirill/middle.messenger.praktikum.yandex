enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: unknown;
    asFile?: boolean;
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

type HTTPMethod = <R=unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>

export class HTTPTransport {
    private apiUrl: string = '';

    constructor(apiPath: string) {
        this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
    }

    get: HTTPMethod = (url, options = {}) => (
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET })
    );

    post: HTTPMethod = (url, options = {}) => (
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST })
    );

    put: HTTPMethod = (url, options = {}) => (
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT })
    );

    delete: HTTPMethod = (url, options = {}) => (
        this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE })
    );

    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
        const { method, data, asFile } = options;

        const dataPrepared = (!asFile && data ? JSON.stringify(data) : data) as BodyInit;

        const response = await fetch(url, {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: !asFile ? { 'Content-Type': 'application/json' } : undefined,
            body: dataPrepared,
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const resultData = await isJson ? response.json() : null;

        return resultData as unknown as TResponse;
    }
}
