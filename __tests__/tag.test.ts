import { expect, test, describe } from 'vitest';
import Tag from '../src/Tag';
import fixtures from './__fixtures__/tag.json';

interface ITagFixtures {
  name: string;
  args: (string | Record<string, string>)[];
  expected: string;
}

describe('Tag (fixtures)', () => {
  fixtures.forEach(({ name, args, expected }: ITagFixtures) => {
    test(name, () => {
      const tag = new Tag(
        args[0] as string,
        (args[1] as Record<string, string | number>) ?? {},
        (args[2] as string) ?? '',
      );
      expect(tag.toString()).toBe(expected);
    });
  });
});
