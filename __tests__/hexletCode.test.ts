// @ts-nocheck

import { describe, expect, test } from "vitest";
import HexletCode from "../src/HexletCode";
import fixtures from "./__fixtures__/hexletCode.json";

interface IHexletCodeFixtures {
  name: string
  template: Record<string, string>
  attributes: Record<string, string | undefined>
  expected: string
}

const cb = {
  2: (f: HexletCode) => {
    f.input('name');
    f.input('job', { as: 'textarea' });
  },
};

describe("HexletCode (fixtures)", () => {
  fixtures.forEach(({ name, template, attributes, expected }: IHexletCodeFixtures, i) => {
    test(name, () => {
      const html = HexletCode.formFor(template, attributes, cb[i] ?? (() => {}));
      expect(html).toBe(expected);
    });
  });
});
