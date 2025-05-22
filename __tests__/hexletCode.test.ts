import { describe, expect, test } from "vitest";
import HexletCode from "../src/HexletCode";
import fixtures from "./__fixtures__/hexletCode.json";
import { IHexletCodeCb } from "../globals";

const cb: Record<string, IHexletCodeCb> = {
  "form2": (f: HexletCode) => {
    f.input("name");
    f.input("job", { as: "textarea" });
  },
  "form3": (f: HexletCode) => {
    f.input("name", { class: "user-input" });
    f.input("job");
  },
  "form4": (f: HexletCode) => {
    f.input("job", { as: "textarea" });
  },
  "form5": (f: HexletCode) => {
    f.input("job", { as: "textarea", rows: 50, cols: 50 });
  },
  "form6": (f: HexletCode) => {
    f.input("name");
    f.input("job", { as: "textarea" });
    f.input("age");
  },
};

describe("HexletCode (fixtures)", () => {
  fixtures.forEach(({ name, template, attributes, expected }) => {
    const filterAttributes = Object.fromEntries(
      Object.entries(attributes).filter(([ _, value ]) => value !== undefined),
    );

    test(name, () => {
      if (name === "form6") {
        expect(() => HexletCode.formFor(template, filterAttributes, cb[name] ?? (() => {
        }))).toThrow(expected);
      } else {
        const html = HexletCode.formFor(template, filterAttributes, cb[name] ?? (() => {
        }));
        expect(html).toBe(expected);
      }
    });
  });
});
