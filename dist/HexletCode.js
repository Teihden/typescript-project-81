import Tag from "./Tag";
class HexletCode {
    template;
    inputString = "";
    static tagAttributesMap = new Map([
        ["input", { type: "text" }],
        ["textarea", { cols: 20, rows: 40 }],
    ]);
    static formFor(template, attributes = {}, cb = () => {
    }) {
        const instance = new HexletCode(template);
        if (cb && typeof cb === "function") {
            cb(instance);
        }
        return `<form action="${attributes.url ?? "#"}" method="post">${instance.inputString}</form>`;
    }
    constructor(template) {
        this.template = template;
    }
    #getFieldValue(name) {
        if (!(name in this.template)) {
            throw new Error(`Field '${name}' does not exist in the template.`);
        }
        return this.template[name] ?? "";
    }
    input(name, cfg = {}) {
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
