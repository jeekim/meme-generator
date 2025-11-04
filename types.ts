export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

export interface MemeCaption {
  topText: string;
  bottomText: string;
}

export interface ImageState {
  src: string;
  width: number;
  height: number;
  originalFileType: string;
}
