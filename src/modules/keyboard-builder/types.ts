export enum BuilderStep {
  Case = 0,
  Pcb = 1,
  Switch = 2,
  Keycaps = 3,
  Review = 4,
}

export interface IBuilderPart {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export interface IBuilderCase extends IBuilderPart {
  layout: string;
  material: string;
  color: string[];
}

export interface IBuilderPcb extends IBuilderPart {
  layout: string;
  hotswap: boolean;
  wireless: boolean;
}

export interface IBuilderSwitch extends IBuilderPart {
  type: 'linear' | 'tactile' | 'clicky';
  actuation: number;
  travel: number;
}

export interface IBuilderKeycaps extends IBuilderPart {
  material: string;
  profile: string;
  legends: string;
}
