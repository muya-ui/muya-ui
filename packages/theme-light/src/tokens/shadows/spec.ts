import { IShadowsSpecRecord } from '../../interfaces/shadows';
import { IShadowsSpec } from '../../interfaces/specs';

const spec: Record<IShadowsSpec, IShadowsSpecRecord> = {
  s1: {
    normal: '0 0 24px 0 rgba(102,102,102,0.08)',
    hover: '0 0 24px 0 rgba(102,102,102,0.16)',
  },
  s2: {
    normal: '0 0 12px 0 rgba(102,102,102,0.12)',
    hover: '0 0 12px 0 rgba(102,102,102,0.20)',
  },
};

export default spec;
