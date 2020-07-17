export const stripComments = (str: string) => str.replace(/\/\*.*?\*\/\n?/g, '');

export const stripWhitespace = (str: string) =>
  str
    .trim()
    .replace(/([;\{\}])/g, '$1  ')
    .replace(/\s+/g, ' ');

export const getCSS = (scope: Document | HTMLElement) =>
  Array.from(scope.querySelectorAll('style'))
    .map(tag => tag.innerHTML)
    .join('\n')
    .replace(/ {/g, '{')
    .replace(/:\s+/g, ':')
    .replace(/:\s+;/g, ':;');

export const expectCSSMatches = (_expectation: string) => {
  const expectation = _expectation
    .replace(/ {/g, '{')
    .replace(/,\s+/g, ',')
    .replace(/:\s+/g, ':')
    .replace(/:\s+;/g, ':;');

  const css = getCSS(document);

  const stripped = stripWhitespace(stripComments(css));
  expect(stripped).toEqual(stripWhitespace(expectation));
  return stripped;
};

export const expectCSSContains = (_expectation: string) => {
  const expectation = _expectation
    .replace(/ {/g, '{')
    .replace(/,\s+/g, ',')
    .replace(/:\s+/g, ':')
    .replace(/:\s+;/g, ':;');

  const css = getCSS(document);

  const stripped = stripWhitespace(stripComments(css));
  expect(stripped).toContain(stripWhitespace(expectation));
  return stripped;
};
