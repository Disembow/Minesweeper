type Modes = Record<string, boolean | string>;

export const classNames = (
  className: string,
  modes: Modes = {},
  additional: string[] = [],
): string =>
  [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(modes)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key),
  ].join(' ');
