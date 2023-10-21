import * as M from '@components/molecules';
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PageList from '@pages';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import Header from '@common/components/organisms/Header';
import classNames from 'classnames/bind';
import { isLoading } from '@modules/atoms';
import styles from './router.module.scss';
import { useRecoilState } from 'recoil';

const cx = classNames.bind(styles);

function Router() {
  const [loading, setLoading] = useRecoilState(isLoading);
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
      {loading && (
        <div className={cx('loading')}>
          <CircularProgress size={20} />
        </div>
      )}
      <M.BottomAppbar />
    </BrowserRouter>
  );
}

export default Router;
