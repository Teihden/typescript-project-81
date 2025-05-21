import { describe, expect, test } from "vitest";
import HexletCode from "../src/HexletCode";
import fixtures from "./__fixtures__/hexletCode.json";

interface IHexletCodeFixtures {
  name: string
  template: Record<string, string>
  attributes: Record<string, string | undefined>
  expected: string
}

describe("HexletCode (fixtures)", () => {
  fixtures.forEach(({ name, template, attributes, expected }: IHexletCodeFixtures) => {
    test(name, () => {
      const html = HexletCode.formFor(template, attributes, () => {});
      expect(html).toBe(expected);
    });
  });
});
