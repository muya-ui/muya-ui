import React, { useState } from 'react';

import { Link, Step, Steps, Spin } from '@muya-ui/core';

export default function Simple() {
  const [current, setCurrent] = useState(0);

  const stepsData = [
    {
      title: 'Jay',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069312065/7FD37039428117756880A94B3224477C.png',
    },
    {
      title: '范特西',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png',
    },
    {
      title: '八度空间',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069358514/9AEFC9EABCD39C0E55DD6D08317B1DBE.png',
    },
    {
      title: '叶惠美',
      description:
        '2003年最被期待的专辑－周杰伦第四张全新国语大碟《叶惠美》，在万众期待之下，确定于7月31隆重发行。周杰伦2003年夏天全新大碟《叶惠美》即将全面曝光！ 久未露面的Jay，原来一直“闭关”筹备新碟，乘势于夏天再战乐坛。今次唱片会走复古而成熟的意大利风格，曲风再度跳脱以往自我风格；为了配合歌路和形象，Jay早前特地到罗马拍摄MV，为新歌带来视听新享受！率先主打歌“以父之名”则是富有《教父》黑帮味道的沉郁歌曲，由Jay作曲，鬼才黄俊郎填词，当中一段意大利歌剧女声配乐令全曲更富欧洲复古之风情！',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069378398/591119A1A614A054499DEDA0C6EBF5FB.png',
      icon: <Spin />,
    },
    {
      title: '七里香',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069399233/A44E14B144B63BFFE34D152C664DD6C4.png',
    },
  ];

  const handleChange = (next: number) => {
    setCurrent(next);
  };

  return (
    <>
      <Steps current={current} onChange={handleChange} style={{ width: '700px' }}>
        {stepsData.map(s => (
          <Step
            key={s.title}
            title={s.title}
            icon={s.icon}
            description={
              <span>
                <Link href="https://www.kujiale.com" target="_blank">
                  我是一个自定义的链接
                </Link>
              </span>
            }
          />
        ))}
      </Steps>
    </>
  );
}

export const meta = {
  title: '自定义内容',
  desc:
    '1. `Step` 组件的 `title` 和 `description` 均可传入自定义节点，开发者可以自行定义\n\n2. `Step` 和 `Steps`组件均可传入`style`、`className`、`onClick`等DOM属性',
};
