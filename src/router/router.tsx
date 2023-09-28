import Header from '@common/components/organisms/Header';
import * as M from '@components/molecules';
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PageList from '@pages';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function Router() {
  interface PageType {
    path: string;
    loginRequired?: boolean;
    default: () => JSX.Element;
  }

  const routes: PageType[] = Object.values(PageList).map((pageItem) => {
    return {
      path: pageItem['path'],
      loginRequired: pageItem['loginRequired'],
      default: pageItem.default,
    };
  });
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes?.map((RouteItem, idx: number) => {
          const RouteElemete: any = RouteItem.default;
          return (
            <Route
              key={'routeKey-' + idx}
              path={RouteItem?.path}
              element={
                RouteItem?.loginRequired ? (
                  localStorage?.accessToken ? (
                    <RouteElemete />
                  ) : (
                    <Navigate to={`/login?redirect=${window.location.pathname}`} />
                  )
                ) : (
                  <RouteElemete />
                )
              }
              //   element={<RouteElemete />}
            ></Route>
          );
        })}
        <Route path={'/*'} element={<Navigate to={`/`} />} />
      </Routes>
      <M.BottomAppbar />
    </BrowserRouter>
  );
}

export default Router;
