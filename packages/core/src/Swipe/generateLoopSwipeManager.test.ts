import generateLoopSwipeManager, {
  calcStepsByPageOneInCloneItems,
  findIndexByOffset,
} from './generateLoopSwipeManager';

const defaultItems = [
  { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 120, left: 60 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 180, left: 120 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 240, left: 180 },
];
const cloneItems = [
  { width: 60, height: 10, top: 0, bottom: 10, right: 300, left: 240 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 360, left: 300 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 420, left: 360 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 480, left: 420 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 540, left: 480 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 600, left: 540 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 600, left: 660 },
];

describe('按容器翻页', () => {
  test('calcStepsByPageOneInCloneItems', () => {
    expect(calcStepsByPageOneInCloneItems(240, 70)).toEqual([30, 100, 170, 240, 310]);
    expect(calcStepsByPageOneInCloneItems(270, 70)).toEqual([60, 130, 200, 270, 340]);
    expect(calcStepsByPageOneInCloneItems(300, 70)).toEqual([20, 90, 160, 230, 300, 370]);
    expect(calcStepsByPageOneInCloneItems(260, 70)).toEqual([50, 120, 190, 260, 330]);
  });

  test('findIndexByOffset', () => {
    expect(findIndexByOffset(240, [30, 100, 170, 240, 310])).toBe(3);
    expect(findIndexByOffset(180, [30, 100, 170, 240, 310])).toBe(2);
  });
  test('测试一般的翻页逻辑 一直往后翻页', () => {
    const manager = generateLoopSwipeManager({
      items: defaultItems,
      cloneItemRects: cloneItems,
      containerSize: 70, // 宽或高
      direction: 'horizontal',
      gutter: 0,
      stepIndex: 0,
      itemIndex: 0,
      defaultIndex: 0,
    });
    expect(manager.pageOffsets).toEqual([30, 100, 170, 240, 310]);
    const offset1 = manager.getStepOffset(manager.index);
    expect(offset1).toBe(240);
    manager.next();

    const offset2 = manager.getStepOffset(manager.index);
    expect(offset2).toBe(310);
    expect(manager.locked).toBe(true);
    expect(manager.index).toBe(1);
    expect(manager.getRealIndexByCurrentIndex(manager.index)).toBe(4);

    manager.unlock();
    expect(manager.index).toBe(1);
    expect(manager.getRealIndexByCurrentIndex(manager.index)).toBe(1);
    expect(manager.pageOffsets).toEqual([0, 70, 140, 210, 280, 350]);
    manager.goTo(3);
    expect(manager.index).toBe(3);
    expect(manager.getRealIndexByCurrentIndex(manager.index)).toBe(3);

    manager.next();
    expect(manager.index).toBe(0);
    expect(manager.getRealIndexByCurrentIndex(manager.index)).toBe(4);

    manager.next();
    expect(manager.locked).toBe(true);
    manager.unlock();
    expect(manager.pageOffsets).toEqual([40, 110, 180, 250, 320]);
  });

  test('测试一般的翻页逻辑 一直往前翻页', () => {
    const manager = generateLoopSwipeManager({
      items: defaultItems,
      cloneItemRects: cloneItems,
      containerSize: 70, // 宽或高
      direction: 'horizontal',
      gutter: 0,
      stepIndex: 0,
      itemIndex: 0,
      defaultIndex: 3,
    });
    expect(manager.index).toBe(2);
    expect(manager.getRealIndexByCurrentIndex(manager.index)).toBe(2);
    manager.prev();
    manager.prev();
    expect(manager.locked).toBe(true);
    manager.unlock();
    expect(manager.pageOffsets).toEqual([60, 130, 200, 270, 340]);
  });
});

describe('按子元素翻页', () => {
  test('测试一般的翻页逻辑 一直往前翻页', () => {
    const manager = generateLoopSwipeManager({
      items: defaultItems,
      cloneItemRects: cloneItems,
      containerSize: 70, // 宽或高
      direction: 'horizontal',
      gutter: 0,
      stepIndex: 0,
      itemIndex: 0,
      defaultIndex: 1,
    });
    expect(manager.itemIndex).toBe(1);
    expect(manager.getRealItemIndexByCurrentItemIndex(manager.itemIndex)).toBe(1);
    manager.prevItem();
    expect(manager.itemIndex).toBe(0);
    expect(manager.locked).toBe(true);
    manager.unlock();
    expect(manager.itemIndex).toBe(0);
    expect(manager.getRealItemIndexByCurrentItemIndex(manager.itemIndex)).toBe(4);
  });

  test('测试一般的翻页逻辑 一直往后翻页', () => {
    const manager = generateLoopSwipeManager({
      items: defaultItems,
      cloneItemRects: cloneItems,
      containerSize: 70, // 宽或高
      direction: 'horizontal',
      gutter: 0,
      stepIndex: 0,
      itemIndex: 0,
      defaultIndex: 0,
    });
    expect(manager.itemIndex).toBe(0);
    expect(manager.getRealItemIndexByCurrentItemIndex(manager.itemIndex)).toBe(4);
    manager.nextItem();
    expect(manager.itemIndex).toBe(1);
    expect(manager.getRealItemIndexByCurrentItemIndex(manager.itemIndex)).toBe(5);
    expect(manager.locked).toBe(true);
  });
});
