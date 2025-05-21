import Tag from "./Tag";
import { IAttributes, IHexletCodeCb, IHexletCodeCfg } from "../globals";

class HexletCode {
  private inputString = "";

  static readonly tagAttributesMap = new Map([
    [ "input", { type: "text" } ],
    [ "textarea", { cols: 20, rows: 40 } ],
  ]);

  static formFor(
    template: Record<string, string>,
    attributes: IAttributes = {},
    cb: IHexletCodeCb = () => {
    },
  ): string {
    const instance = new HexletCode(template);

    if (cb && typeof cb === "function") {
      cb(instance);
    }

    return `<form action="${attributes.url ?? "#"}" method="post">${instance.inputString}</form>`;
  }

  constructor(
    public template: Record<string, string>,
  ) {
  }

  #getFieldValue(name: string): string {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }
    return this.template[name] ?? "";
  }


  input(
    name: string,
    cfg: IHexletCodeCfg = {},
  ): void {
    const fieldValue = this.#getFieldValue(name);
    const tagName = cfg.as ?? "input";
    const valueAttribute = tagName === "input" ? { value: fieldValue } : {};
    const tagDefaultAttributes = HexletCode.tagAttributesMap.get(tagName) ?? {};
    const { as, ...restAttributes } = cfg;

    const attributes = {
      name,
      ...tagDefaultAttributes,
      ...valueAttribute,
      ...restAttributes,
    };

    this.inputString += new Tag(tagName, attributes, fieldValue).toString();
  }
}

export default HexletCode;
