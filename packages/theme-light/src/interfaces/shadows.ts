import { IShadowsSpec } from './specs';

export interface IShadowsSpecRecord {
  normal: string;
  hover: string;
}

export interface IShadows {
  spec: Record<IShadowsSpec, IShadowsSpecRecord>;
  pattern: {
    popper: IShadowsSpecRecord;
  };
}
