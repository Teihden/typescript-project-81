class HexletCode {
  static formFor(
    // @ts-expect-error @typescript-eslint/no-unused-vars
    template: Record<string, string>,
    attributes: Record<string, string | undefined> = {},
    // @ts-expect-error @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cb: () => void = () => {},
  ): string {
    return `<form action="${attributes.url ?? "#"}" method="post"></form>`;
  }
}

export default HexletCode;
