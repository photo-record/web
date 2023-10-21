// import * as A from '@components/atoms';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { getContentsLists } from '@modules/get';
import ContentListItem from '@common/components/organisms/ContentListItem';

const cx = classNames.bind(styles);
function Home() {
  const [lists, setLists] = useState(undefined);
  const navigate = useNavigate();
  async function fetchData() {
    const data = await getContentsLists();
    setLists(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return lists !== undefined ? (
    lists?.length === 0 ? (
      <div className={cx('main-container', 'main-no-img')}>
        <div className={cx('main-content')}>
          <div>
            아직 등록된 사진이 없어요
            <br />
            사진을 등록해보세요!
          </div>
          <button
            onClick={() => {
              navigate('/create');
            }}
          >
            등록하러 가기
          </button>
        </div>
      </div>
    ) : (
      <div className={cx('content-list-full-container')}>
        {lists?.map((list: object) => {
          return <ContentListItem data={list} />;
        })}
      </div>
    )
  ) : (
    <div>로딩중...</div>
  );
}
export default Home;
export const path = '/';
export const loginRequired = true;
