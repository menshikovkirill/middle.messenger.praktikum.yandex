import { expect } from 'chai';
import Route from './Route.ts';
import Block from './Block.ts';
import sinon from 'sinon';

describe('Route', () => {
    const pathname = '/pathtest';
    const rootQuery = '#root';

    let route: Route;

    beforeEach(() => {
        class Page extends Block {
            constructor(props: {}) {
                super({
                    ...props,
                });
            }

            public render(): string {
                return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
            }
        }

        route = new Route(pathname, Page as typeof Block, { rootQuery });
    });

    it('Route должен правильно матчиться', () => {
        expect(route.match(pathname)).to.be.true;
        expect(route.match('/test1')).to.be.false;
    })

    it('Route должен показывапть компонент при методе render()', () => {
        route.render();
        expect(route['_block']).to.not.null;
    })

    it('Route должен скрывать компонент при методе leave()', () => {
        route.render();
        const block = route['_block'] as Block;
        const spy = sinon.stub(block, 'hide');
        route.leave();
        expect(spy.calledOnce).to.be.true;
    })

    it('Route должен рендерить компонент при navigate()', () => {
        const spy = sinon.stub(route, 'render');
        route.navigate(pathname);
        expect(spy.calledOnce).to.be.true;
      });
})
