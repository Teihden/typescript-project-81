import Tag from "./Tag";
import { capitalize } from "es-toolkit";
import { filterObj } from "./helpers";
export default class HexletCode {
    template;
    formContent = "";
    static tagAttributesMap = new Map([
        ["input", ({ name, value } = {}) => ({ name, type: "text", value })],
        ["inputSubmit", ({ value } = {}) => ({ type: "submit", value })],
        ["textarea", ({ name } = {}) => ({ cols: 20, rows: 40, name })],
        ["form", ({ action } = {}) => ({ method: "post", action })],
        ["label", ({ labelFor } = {}) => ({ for: labelFor })],
    ]);
    static formFor(template = {}, attributes = {}, cb = () => {
    }) {
        const instance = new HexletCode(template);
        if (cb && typeof cb === "function") {
            cb(instance);
        }
        const getFormAttributes = HexletCode.tagAttributesMap.get("form") ?? (() => ({}));
        return new Tag("form", filterObj(getFormAttributes({ action: attributes.url?.toString() ?? "#" })), instance.formContent).toString();
    }
    constructor(template = {}) {
        this.template = template;
    }
    #getControlValue(name) {
        if (!(name in this.template)) {
            throw new Error(`Field '${name}' does not exist in the template.`);
        }
        return this.template[name] ?? "";
    }
    input(name, cfg = {}) {
        const value = this.#getControlValue(name);
        const tagName = cfg.as ?? "input";
        const { as, ...restAttributes } = cfg;
        const getLabelAttributes = HexletCode.tagAttributesMap.get("label") ?? (() => ({}));
        const labelString = new Tag("label", filterObj(getLabelAttributes({ labelFor: name })), capitalize(name)).toString();
        const getControlAttributes = HexletCode.tagAttributesMap.get(tagName) ?? (() => ({}));
        const inputString = new Tag(tagName, filterObj({ ...getControlAttributes({ name, value }), ...restAttributes }), value).toString();
        this.formContent += `${labelString}${inputString}`;
    }
    submit(value) {
        const getSubmitInputAttributes = HexletCode.tagAttributesMap.get("inputSubmit") ?? (() => ({}));
        const submitInputString = new Tag("input", filterObj(getSubmitInputAttributes({ value: value ?? "Save" })), "").toString();
        this.formContent += `${submitInputString}`;
    }
}
