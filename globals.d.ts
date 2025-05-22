interface IHexletCodeCb {
  (instance: HexletCode): void;
}

interface IHexletCodeCfg {
  [key: string]: string | number;
  as?: string;
}

interface IAttributes {
  [key: string]: string | number;
}

export {
  IHexletCodeCb,
  IHexletCodeCfg,
  IAttributes,
};
