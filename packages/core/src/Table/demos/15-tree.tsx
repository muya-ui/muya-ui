import React from 'react';
import { Table, ITableColumn } from '@muya-ui/core';

export default function ExpandableDemo() {
  interface Album {
    title: string;
    description: string;
    img: string;
    date: string;
    children?: Album[];
  }

  const albums: Album[] = [
    {
      title: '范特西',
      description:
        '周杰伦的第二张专辑---「范特西」(音同Fantasy)，充分反射出杰伦思绪充沛的一面，他独特的想象空间，可说是构成此张专辑的主要原动力。仅仅浏览「爸我回来了」、「双截棍」、「忍者」、「爱在西元前」、「上海一九四三」、「威廉古堡」等特殊歌名，大家的好奇心就会不自觉被轻轻挑起，从杰伦更多元化的音乐尝试，不难嗅出他此番强烈的企图心，而这突破自己的考验，杰伦不仅做到了，而且，做得还十分出色！',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069346213/A8C6DECED7C868F1E57AC115EA1D5BAA.png',
      date: '2001-09-20',
      children: [
        {
          title: 'Jay',
          description:
            '杰伦”同名专辑，整张曲风充斥着杰伦对音乐的超高技术创作，专辑中以R&B及New Hip-Hop的新曲为主，加上古典巴洛克式弦乐伴奏及Band的加入，形成一种英国式的复古风格，更特别的是，杰伦尝试着把超高难度，西班牙式风格的弦乐演奏，表现在专辑歌曲中，意境却出忽意料的极度逼近电影配乐，这种音乐是台湾目前所没有的。',
          img:
            '//qhstaticssl.kujiale.com/newt/29/image/png/1567069312065/7FD37039428117756880A94B3224477C.png',
          date: '2020-06-18',
        },
        {
          title: 'Mojito',
          description:
            '睽违多时周杰伦再推新单曲，用音乐环游世界的他，这次带领大家来到充满音乐、舞蹈的迷幻之城「古巴」，以古巴最著名的鸡尾酒「Mojito」为名而写的这首情歌，一如古巴这个城市以它独有的建筑风景，写成一封封献给天空的情书，「Mojito」就是献给每一对来自世界各地的恋人，最浪漫的特调。',
          img: '//y.gtimg.cn/music/photo_new/T002R300x300M0000009C3rp3Kfwg0_3.jpg',
          date: '2020-08-03',
          children: [
            {
              title: 'Mojito-1',
              description:
                '睽违多时周杰伦再推新单曲，用音乐环游世界的他，这次带领大家来到充满音乐、舞蹈的迷幻之城「古巴」，以古巴最著名的鸡尾酒「Mojito」为名而写的这首情歌，一如古巴这个城市以它独有的建筑风景，写成一封封献给天空的情书，「Mojito」就是献给每一对来自世界各地的恋人，最浪漫的特调。',
              img: '//y.gtimg.cn/music/photo_new/T002R300x300M0000009C3rp3Kfwg0_3.jpg',
              date: '2020-08-03',
            },
          ],
        },
      ],
    },
    {
      title: '八度空间',
      description:
        '在金曲奖上大放异彩的音乐奇才周杰伦，今年破天荒地一连拿下多项大奖，可说是缔造华语歌坛前所未有的新纪录，这样傲人的成绩，不仅再度肯定杰伦音乐上过人的才华，无疑的，也是替饱受盗版之苦的唱片娱乐圈，带来一丝希望曙光！ 2002年七月，杰伦又一次展现他惊人的音乐狂想力，他尝试把自己的奇想格局更加扩大，玩弄音符是杰伦天生潜在的本性，但拥有音乐天赋的杰伦并不视骄而宠，反而更战战兢兢的制作出一首又一首脍炙人口的作品，因为他深知，大家的肯定是他创作的原动力！因此，请擦亮你的眼睛，欣赏杰伦驰骋游戏空间所散发的光彩！',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069358514/9AEFC9EABCD39C0E55DD6D08317B1DBE.png',
      date: '2002-07-18',
      children: [
        {
          title: 'Mojito-2',
          description:
            '睽违多时周杰伦再推新单曲，用音乐环游世界的他，这次带领大家来到充满音乐、舞蹈的迷幻之城「古巴」，以古巴最著名的鸡尾酒「Mojito」为名而写的这首情歌，一如古巴这个城市以它独有的建筑风景，写成一封封献给天空的情书，「Mojito」就是献给每一对来自世界各地的恋人，最浪漫的特调。',
          img: '//y.gtimg.cn/music/photo_new/T002R300x300M0000009C3rp3Kfwg0_3.jpg',
          date: '2020-08-03',
        },
      ],
    },
    {
      title: '叶惠美',
      description:
        '2003年最被期待的专辑－周杰伦第四张全新国语大碟《叶惠美》，在万众期待之下，确定于7月31隆重发行。周杰伦2003年夏天全新大碟《叶惠美》即将全面曝光！ 久未露面的Jay，原来一直“闭关”筹备新碟，乘势于夏天再战乐坛。今次唱片会走复古而成熟的意大利风格，曲风再度跳脱以往自我风格；为了配合歌路和形象，Jay早前特地到罗马拍摄MV，为新歌带来视听新享受！率先主打歌“以父之名”则是富有《教父》黑帮味道的沉郁歌曲，由Jay作曲，鬼才黄俊郎填词，当中一段意大利歌剧女声配乐令全曲更富欧洲复古之风情！',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069378398/591119A1A614A054499DEDA0C6EBF5FB.png',
      date: '2003-07-31',
    },
    {
      title: '七里香',
      description:
        '周杰伦这次引用了诗人席幕蓉名诗《七里香》作为新专辑名称，周杰伦以往每一次的专辑名称都给了歌迷许多想象空间，也给了大家许多惊叹号。这次也许并不令人惊喜。但是周杰伦自有说法：“之所以要把新专辑定名为《七里香》，是因为对这一次专辑的音乐充满自信，希望大家能把注意力焦点放在音乐上，将话题回归到音乐上。 这张《七里香》仍是周杰伦与最佳拍档方文山合作的作品。在炎热的夏天听《七里香》，有一种如沐清风的凉爽。',
      img:
        '//qhstaticssl.kujiale.com/newt/29/image/png/1567069399233/A44E14B144B63BFFE34D152C664DD6C4.png',
      date: '2004-08-03',
    },
  ];

  const columns: ITableColumn<Album>[] = [
    {
      title: '专辑名',
      key: 'title',
      render: album => <strong>《{album.title}》</strong>,
    },
    // {
    //   title: '专辑封面',
    //   key: 'img',
    //   render: album => <Img src={album.img} width={200} height={200} />,
    // },
    {
      title: '发行时间',
      key: 'date',
      width: 200,
      dataIndex: 'date',
    },
    {
      title: '专辑介绍',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <Table<Album>
      columns={columns}
      dataSource={albums}
      rowSelection={{
        onSelect(selected, row) {
          console.log('selection onSelect', selected, row);
        },
        onSelectAll(selected, rows) {
          console.log('selection onSelectAll', selected, rows);
        },
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('selection outer onChange', selectedRowKeys, selectedRows);
        },
      }}
      ellipsis
      rowKey="title"
      expandable={{
        defaultExpandAllRows: true,
        onExpandedRowsChange(expandedRowKeys) {
          console.log('onExpandedRowsChange', expandedRowKeys);
        },
        onExpand(expanded, record) {
          console.log('onExpand', expanded, record);
        },
      }}
    />
  );
}

export const meta = {
  title: '树形数据展示',
  desc:
    '表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 `childrenColumnName` 进行配置。\n\n可以通过设置 `indentSize` 以控制每一层的缩进宽度。\n\n > 注：暂不支持父子数据递归关联选择。',
};
