import { expect } from "chai";
import { HTTPTransport } from "./fetch";
import sinon from 'sinon';

describe('HTTPTransport', () => {
    let transport: HTTPTransport;

    before(() => {
        transport = new HTTPTransport('/test');
    })

    it('Должен устанавливать apiUrl', () => {
        expect(transport['apiUrl']).to.be.equal('https://ya-praktikum.tech/api/v2/test');
    });

    describe('Метод get', () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
          sandbox = sinon.createSandbox();
        });

        afterEach(() => {
          sandbox.restore();
        });

        it('Должен возвращать HTTPTransport.GET', async () => {
            const url = '/url';
            const options = { method: 'GET' };
            const spy = sandbox.spy(transport, 'request');
            transport.get(url, options as {});
            expect(spy.args[0][1]?.method).to.equal('GET');
        });

        it('Должен использовать apiUrl для формирования URL', async () => {
            const url = '/url';
            const options = { method: 'GET' };
            const spy = sandbox.spy(transport, 'request');
            transport.get(url, options as {});
            expect(spy.args[0][0]).to.equal(`https://ya-praktikum.tech/api/v2/test${url}`);
        });
    });

    describe('Метод post', () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
          sandbox = sinon.createSandbox();
        });

        afterEach(() => {
          sandbox.restore();
        });

        it('Должен возвращать HTTPTransport.POST', async () => {
            const url = '/url';
            const options = { method: 'POST' };
            const spy = sandbox.spy(transport, 'request');
            transport.post(url, options as {});
            expect(spy.args[0][1]?.method).to.equal('POST');
        });

        it('Должен использовать apiUrl для формирования URL', async () => {
            const url = '/url';
            const options = { method: 'POST' };
            const spy = sandbox.spy(transport, 'request');
            transport.post(url, options as {});
            expect(spy.args[0][0]).to.equal(`https://ya-praktikum.tech/api/v2/test${url}`);
        });
    });

    describe('Метод put', () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
          sandbox = sinon.createSandbox();
        });

        afterEach(() => {
          sandbox.restore();
        });

        it('Должен возвращать HTTPTransport.PUT', async () => {
            const url = '/url';
            const options = { method: 'PUT' };
            const spy = sandbox.spy(transport, 'request');
            transport.put(url, options as {});
            expect(spy.args[0][1]?.method).to.equal('PUT');
        });

        it('Должен использовать apiUrl для формирования URL', async () => {
            const url = '/url';
            const options = { method: 'PUT' };
            const spy = sandbox.spy(transport, 'request');
            transport.put(url, options as {});
            expect(spy.args[0][0]).to.equal(`https://ya-praktikum.tech/api/v2/test${url}`);
        });
    });

    describe('Метод delete', () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
          sandbox = sinon.createSandbox();
        });

        afterEach(() => {
          sandbox.restore();
        });

        it('Должен возвращать HTTPTransport.DELETE', async () => {
            const url = '/url';
            const options = { method: 'DELETE' };
            const spy = sandbox.spy(transport, 'request');
            transport.delete(url, options as {});
            expect(spy.args[0][1]?.method).to.equal('DELETE');
        });

        it('Должен использовать apiUrl для формирования URL', async () => {
            const url = '/url';
            const options = { method: 'DELETE' };
            const spy = sandbox.spy(transport, 'request');
            transport.delete(url, options as {});
            expect(spy.args[0][0]).to.equal(`https://ya-praktikum.tech/api/v2/test${url}`);
        });
    });
});
