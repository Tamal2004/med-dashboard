import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export { history };
export * from './AuthenticatedAppRoutes';
export * from './UnauthenticatedAppRoutes';
