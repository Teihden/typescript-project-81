interface IHexletCodeCb {
  (instance: HexletCode): void;
}

interface IHexletCodeCfg {
  [key: string]: string | number | undefined;
  as?: string;
}

interface IAttributes {
  [key: string]: string | number | undefined;
}

export {
  IHexletCodeCb,
  IHexletCodeCfg,
  IAttributes,
};
