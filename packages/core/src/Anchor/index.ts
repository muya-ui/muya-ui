import AnchorProvider from './AnchorProvider';
import AnchorTab from './AnchorTab';
import AnchorTabs from './AnchorTabs';
import AnchorScrollView from './AnchorScrollView';
import useAnchor from './useAnchor';

const Anchor = {
  useAnchor,
  Provider: AnchorProvider,
  Tab: AnchorTab,
  Tabs: AnchorTabs,
  ScrollView: AnchorScrollView,
};

export default Anchor;
export { Anchor };
export * from './context';
export * from './types';
