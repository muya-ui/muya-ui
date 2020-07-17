import { useRef, useCallback, useState, useEffect } from 'react';
import { IAnchorProviderProps, IAnchorContainer, IAnchorBag } from './types';
import { getOffsetTop, getScroll, scrollTo } from './utils';
import warning from 'warning';

interface Section {
  link: string;
  top: number;
}

const sharpMatcherRegx = /#(\S+)$/;

export default function useAnchor(props: IAnchorProviderProps): IAnchorBag {
  const {
    onChange,
    offsetTop = 0,
    disableHash = false,
    duration = 300,
    bounds,
    direction = 'vertical',
  } = props;
  const linksRef = useRef<string[]>([]);
  const animatingRef = useRef<boolean>(false);
  const [container, setContainer] = useState<IAnchorContainer>(window);
  const [activeLink, setActiveLink] = useState<null | string>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  const registerLink = useCallback((link: string) => {
    if (linksRef.current.indexOf(link) < 0) {
      linksRef.current.push(link);
    } else {
      warning(false, `[Anchor]: ${link} is already registered !`);
    }
  }, []);

  const unregisterLink = useCallback((link: string) => {
    const index = linksRef.current.indexOf(link);
    if (index > 0) {
      linksRef.current.splice(index, 1);
    }
  }, []);

  const getContainer = useCallback(
    (node: HTMLElement | null) => {
      if (node && container !== node) {
        setContainer(node);
      }
    },
    [container],
  );

  const setCurrentActiveLink = useCallback(
    (link: string) => {
      if (activeLink !== link) {
        setActiveLink(link);
        if (onChange) {
          onChange(link);
        }
      }
    },
    [activeLink, onChange],
  );

  const getCurrentAnchor = useCallback(
    (offsetTop: number, bounds = 5): string => {
      const linkSections: Array<Section> = [];
      linksRef.current.forEach(link => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch) {
          return;
        }
        const target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          const top = getOffsetTop(target, container);
          if (top < offsetTop + bounds) {
            linkSections.push({
              link,
              top,
            });
          }
        }
      });

      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        return maxSection.link;
      }
      return '';
    },
    [container],
  );

  const handleScrollTo = useCallback(
    (link: string) => {
      if (animatingRef.current) return;
      setCurrentActiveLink(link);
      const scrollTop = getScroll(container, true);
      const sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= offsetTop;
      animatingRef.current = true;
      scrollTo(y, {
        callback: () => {
          animatingRef.current = false;
        },
        duration,
        container,
      });
    },
    [container, duration, offsetTop, setCurrentActiveLink],
  );

  const handleScroll = useCallback(() => {
    if (animatingRef.current) {
      return;
    }

    const currentActiveLink = getCurrentAnchor(offsetTop, bounds);
    setCurrentActiveLink(currentActiveLink);
  }, [bounds, getCurrentAnchor, offsetTop, setCurrentActiveLink]);

  const updateIndicator = useCallback((top: number, height: number) => {
    setIndicatorTop(top);
    setIndicatorHeight(height);
  }, []);

  useEffect(() => {
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, handleScroll]);

  useEffect(() => {
    handleScroll();
    const hash = decodeURIComponent(location.hash);
    if (hash && linksRef.current.indexOf(hash) > 0) {
      handleScrollTo(hash);
    }
  }, [container]); // eslint-disable-line

  return {
    activeLink,
    disableHash,
    direction,
    indicatorHeight,
    indicatorTop,
    registerLink,
    unregisterLink,
    getContainer,
    setCurrentActiveLink,
    getCurrentAnchor,
    handleScrollTo,
    handleScroll,
    updateIndicator,
  };
}
