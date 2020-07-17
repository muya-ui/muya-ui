export interface IImgDomSize {
  width: number;
  height: number;
}

export interface IImgDragState {
  down: boolean;
  move: boolean;
  x?: number;
  y?: number;
  top?: number;
  left?: number;
}

export enum ImgResizeTrigger {
  Loaded = 'Loaded',
  Resize = 'Resize',
  Exited = 'Exited',
  Zoom = 'Zoom',
}
