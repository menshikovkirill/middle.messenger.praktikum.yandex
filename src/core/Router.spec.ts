import { expect } from 'chai';
import Block from './Block.ts';
import sinon from 'sinon';
import Router from './Router.ts';

describe('Router', () => {
    let router: Router;
    let block: Block;

    beforeEach(() => {
        router = new Router('#app');
    });

    it('Router должен отдавать самого себя', () => {
        const router1 = new Router("#app");
        const router2 = new Router("#app");

        expect(router1).to.be.equal(router2);
    })

    it('Router должен добавлять путь при использовании use()', () => {
        router.use('new_path1', block).use('new_path2', block);

        expect(router['routes'][0]['_pathname']).to.be.equal('new_path1');
        expect(router['routes'][1]['_pathname']).to.be.equal('new_path2');
    })

    it('Router должен находить нужный pathname через фунцию getRoute()', () => {
        expect(router.getRoute('new_path1')!['_pathname']).to.be.equal('new_path1');
    })

    it('Route должна работать функция back()', () => {
        const spy = sinon.spy(router['history'], 'back');
        router?.back();
        expect(spy.calledOnce).to.be.true;
    })

    it('Route должна работать функция forward()', () => {
        const spy = sinon.spy(router['history'], 'forward');
        router?.forward();
        expect(spy.calledOnce).to.be.true;
    })
})
