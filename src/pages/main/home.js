// import * as A from '@components/atoms';

import React, { useEffect, useState } from 'react';

import ContentListItem from '@common/components/organisms/ContentListItem';
import ImageCalendar from '@common/components/organisms/ImageCalendar';
import { ReactComponent as SvgCalendar } from '@assets/svgs/calendar.svg';
import { ReactComponent as SvgGallery } from '@assets/svgs/gallery.svg';
import { ReactComponent as SvgList } from '@assets/svgs/list.svg';
import classNames from 'classnames/bind';
import { getContentsLists } from '@modules/get';
import { isLoading } from '@modules/atoms';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const cx = classNames.bind(styles);
function Home() {
  const [lists, setLists] = useState(undefined);
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useRecoilState(isLoading);
  const navigate = useNavigate();
  async function fetchData() {
    try {
      setLoading(true);
      const data = await getContentsLists();
      setLists(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
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
        <h1 className={cx('headline1BD')}>쌓인 기록들이에요</h1>
        <div className={cx('tab-section')}>
          <button className={cx('tab', tab === 1 && 'tab-active')} onClick={() => setTab(1)}>
            <SvgList />
          </button>
          <button className={cx('tab', tab === 2 && 'tab-active')} onClick={() => setTab(2)}>
            <SvgGallery />
          </button>
          <button className={cx('tab', tab === 3 && 'tab-active')} onClick={() => setTab(3)}>
            <SvgCalendar />
          </button>
        </div>
        {tab === 1 && (
          <div className={cx('list-container', 'list-container-list')}>
            {lists?.map((list) => {
              return <ContentListItem data={list} />;
            })}
          </div>
        )}
        {tab === 2 && (
          <div className={cx('list-container', 'list-container-gallery')}>
            {lists?.map((list) => {
              return (
                <img
                  src={list?.thumbnailSrc}
                  alt={list?.thumbnailSrc}
                  onClick={() => navigate(`/detail/${list?.id}`)}
                />
              );
            })}
          </div>
        )}
        {tab === 3 && (
          <div className={cx('list-container', 'list-container-calendar')}>
            <ImageCalendar lists={lists} />
          </div>
        )}
      </div>
    )
  ) : (
    <div></div>
  );
}
export default Home;
export const path = '/';
export const loginRequired = true;
