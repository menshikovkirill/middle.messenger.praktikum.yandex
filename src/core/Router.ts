import Block from "./Block";
import Route from "./Route";

class Router {
    // eslint-disable-next-line no-use-before-define
    static __instance: Router | null = null;

    private routes: Route[] = [];

    private history = window.history;

    private _currentRoute: Route | null = null;

    private _rootQuery: string | null = null;

    public badRouteHandler?: () => void;

    constructor(rootQuery: string | null) {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = Array<Route>();
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: unknown) {
        const route = new Route(pathname, block as typeof Block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: Event) => {
            this._onRoute(event.currentTarget?.location.pathname);
        });
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
          return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        if (route !== null) {
            route.render();
        }
    }

    go(pathname: string) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward();
    }

    getRoute(pathname: string) {
      const route = this.routes.find((route) => route.match(pathname));

      if (!route) {
        return this.routes.find((route) => route.match('*'));
      }

      return route;
    }
}

export default Router;
