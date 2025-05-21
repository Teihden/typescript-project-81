import Tag from "./Tag";

class HexletCode {
  private inputString = "";

  static readonly tagAttributesMap = new Map([
    [ "textarea", { rows: 20, cols: 40 } ],
  ]);

  static formFor(
    template: Record<string, string>,
    attributes: Record<string, string | undefined> = {},
    cb: ( instance?: HexletCode ) => void = () => {},
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

  input(key: string, cfg: Record<string, string | undefined> = {}) {
    let value;

    if (this.template[key]) {
      value = this.template[key] ?? "";
    } else {
      throw Error(`Field ${key} does not exist in the template.`);
    }

    const tagName = cfg.as ?? "input";
    const { as, ...restAttributes } = cfg;
    const attributes = { ...HexletCode.tagAttributesMap.get(tagName) ?? {}, ...restAttributes };
    this.inputString += new Tag(tagName, attributes, value).toString();
  }
}

export default HexletCode;
