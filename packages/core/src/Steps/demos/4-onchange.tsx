import React, { useState } from 'react';
import { Steps, Step, Button, toast } from '@muya-ui/core';

export default function Change() {
  const [current, setCurrent] = useState(1);

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
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069378398/591119A1A614A054499DEDA0C6EBF5FB.png',
    },
    {
      title: '七里香',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069399233/A44E14B144B63BFFE34D152C664DD6C4.png',
    },
  ];

  const next = () => {
    if (current < stepsData.length - 1) {
      setCurrent(c => c + 1);
    } else {
      toast.success('已完成所有步骤');
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
    } else {
      toast.info('没有上一步啦');
    }
  };

  const handleChange = (next: number) => {
    setCurrent(next);
  };

  return (
    <>
      <Steps current={current} onChange={handleChange} style={{ marginBottom: '20px' }}>
        {stepsData.map(s => (
          <Step key={s.title} title={s.title} description={s.title} />
        ))}
      </Steps>
      <div style={{ marginBottom: '20px' }}>
        <img src={stepsData[current].img} />
      </div>
    </>
  );
}

export const meta = {
  title: '点击步骤条切换',
  desc: '传入`onChange`回调函数，步骤条即为可点击状态，根据onChange传递的参数来改变 `current` 属性',
};
