import React, { useEffect, useState, useRef } from 'react';
import './animate-sort.css';

interface IFProps {
  list: FListItem[];
  order?: ESortType; // DESC or ESC
  fontSize: number; // default 16
}

interface FListItem {
  id: number;
  text: string;
  count: number;
  color: string;
}

enum ESortType {
  DESC = 'DESC',
  ESC = 'ESC',
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

function getWH(fontSize: number, str: string) {
  // let dom = document.createElement('label');
  // dom.style.fontSize = fontSize + 'px';
  let width = fontSize * (str.length + 1);
  let height = fontSize;
  return {
    width,
    height,
  };
}

function formatNumber(num: number): string | number {
  if (!num || isNaN(num)) return 0;
  return num > 100000000
    ? (num / 100000000).toFixed(1) + '亿'
    : num > 10000
    ? (num / 10000).toFixed(1) + '万'
    : num;
}

function AnimateSort(props: IFProps) {
  const { list, order, fontSize } = props;
  // const [labelNameWidth, setLabelNameWidth] = useState(116);
  const eR = useRef<HTMLDivElement | null | undefined>();
  // 存储list排序 {id: sort}
  const _m: { [key: string]: number } = {};
  let lw = 0;
  let lh = 0;
  let maxCount = 0;
  const dw = (eR.current && eR.current.clientWidth) || 0;
  const dh = (eR.current && eR.current.clientHeight) || 0;
  list
    .concat([])
    .sort((a, b) =>
      order == ESortType.ESC ? a.count - b.count : b.count - a.count,
    )
    .map((item, index) => {
      _m[item.id] = index;
      maxCount = maxCount > item.count ? maxCount : item.count;
      const wh = getWH(fontSize, item.text);
      lw = wh.width > lw ? wh.width : lw;
      lh = wh.height > lh ? wh.height : lh;
    });

  return (
    <div className="__as_box">
      <div
        className="__as_container"
        style={{
          fontSize: fontSize,
          transform: `translateY(${(dh - lh * list.length * 2) / 2}px)`,
        }}
        ref={eR}
      >
        {list.map((item, index) => {
          return (
            <div key={item.id} style={{ top: (lh + fontSize) * _m[item.id] }}>
              <label className="__as_labelname" style={{ width: lw }}>
                {item.text}
              </label>
              <div
                className="__as_progress"
                style={{
                  width: ((dw - lw * 1.7) * item.count) / maxCount,
                  height: lh,
                  background: item.color,
                }}
              />
              <label
                className="__as_labelcount"
                style={{
                  fontSize: (fontSize * 2) / 3,
                  color: item.color,
                }}
              >
                {formatNumber(item.count)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

AnimateSort.defaultProps = {
  list: [],
  order: ESortType.DESC,
  fontSize: 16,
};
export default AnimateSort;
