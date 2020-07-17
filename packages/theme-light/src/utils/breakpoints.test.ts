import { breakpointsSpec } from '../tokens/breakpoints';
import breakpointsUtils from './breakpoints';

describe('测试断点', () => {
  describe('up', () => {
    test('should work for xs', () => {
      expect(breakpointsUtils.up(breakpointsSpec, 'xs')).toBe('@media (min-width:0px)');
    });

    test('should work for md', () => {
      expect(breakpointsUtils.up(breakpointsSpec, 'md')).toBe('@media (min-width:1440px)');
    });
  });

  describe('down', () => {
    test('should work', () => {
      expect(breakpointsUtils.down(breakpointsSpec, 'sm')).toBe('@media (max-width:1439.95px)');
    });

    test('should work for md', () => {
      expect(breakpointsUtils.down(breakpointsSpec, 'md')).toBe('@media (max-width:1679.95px)');
    });

    test('should use the specified key if it is not a recognized breakpoint', () => {
      expect(breakpointsUtils.down(breakpointsSpec, 600)).toBe('@media (max-width:599.95px)');
    });

    test('should apply to all sizes for xl', () => {
      expect(breakpointsUtils.down(breakpointsSpec, 'xl')).toBe('@media (min-width:0px)');
    });
  });

  describe('between', () => {
    test('should work', () => {
      expect(breakpointsUtils.between(breakpointsSpec, 'sm', 'md')).toBe(
        '@media (min-width:1280px) and (max-width:1679.95px)',
      );
    });

    test('on xl should call up', () => {
      expect(breakpointsUtils.between(breakpointsSpec, 'lg', 'xl')).toBe(
        '@media (min-width:1680px)',
      );
    });
  });

  describe('only', () => {
    test('should work', () => {
      expect(breakpointsUtils.only(breakpointsSpec, 'md')).toBe(
        '@media (min-width:1440px) and (max-width:1679.95px)',
      );
    });

    test('on xl should call up', () => {
      expect(breakpointsUtils.only(breakpointsSpec, 'xl')).toBe('@media (min-width:1920px)');
    });
  });

  describe('width', () => {
    test('should work', () => {
      expect(breakpointsUtils.width(breakpointsSpec, 'md')).toBe(1440);
    });
  });
});
