import { expect, test } from "vitest";
import Tag from "../src/Tag";

test("br0", () => {
  const tag = new Tag("br");
  expect(tag.toString()).toBe("<br>");
});

test("img0", () => {
  const tag = new Tag("img");
  expect(tag.toString()).toBe("<img>");
});

test("img1", () => {
  const tag = new Tag("img", { src: "path/to/image" });
  expect(tag.toString()).toBe('<img src="path/to/image">');
});

test("input0", () => {
  const tag = new Tag("input");
  expect(tag.toString()).toBe("<input>");
});

test("input1", () => {
  const tag = new Tag("input", { type: "submit", value: "Save" });
  expect(tag.toString()).toBe('<input type="submit" value="Save">');
});

test("label0", () => {
  const tag = new Tag("label");
  expect(tag.toString()).toBe("<label></label>");
});

test("label1", () => {
  const tag = new Tag("label", {}, "Email");
  expect(tag.toString()).toBe("<label>Email</label>");
});

test("label2", () => {
  const tag = new Tag("label", { for: "email" }, "Email");
  expect(tag.toString()).toBe('<label for="email">Email</label>');
});

test("div", () => {
  const tag = new Tag("div");
  expect(tag.toString()).toBe("<div></div>");
});
