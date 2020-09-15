import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import AnimateSort from './component/AnimateSort';

interface IFProps {
  [key: string]: any;
}

interface FListItem {
  id: number;
  text: string;
  count: number;
  color: string;
}

export default function AnimateSortContainer(props: IFProps) {
  const [list, setList] = useState<FListItem[]>([]);
  useEffect(() => {
    getList();
  }, []);

  function getList() {
    const list = [
      {
        id: 1,
        text: '中国',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 2,
        text: '中国台湾',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 3,
        text: '中国香港',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 4,
        text: '中国澳门',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 5,
        text: '美国',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 6,
        text: '日本',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 7,
        text: '韩国',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
      {
        id: 8,
        text: '意大利',
        count: Math.floor(Math.random() * 8000000),
        color: randomHexColor(),
      },
    ];
    setList(list);
    setTimeout(() => {
      getList();
    }, 3000);
  }

  function randomHexColor() {
    //随机生成十六进制颜色 返回‘#'开头16进制颜色
    return (
      '#' +
      Math.random()
        .toString(16)
        .substring(2, 8)
    );
  }

  return (
    <div className={styles.wrap}>
      <AnimateSort list={list} order={'DESC'} fontSize={18} />
    </div>
  );
}
