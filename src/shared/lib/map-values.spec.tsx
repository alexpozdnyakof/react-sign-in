import mapValues from './map-values';

describe('MapValues', () => {
  it('should map numbers', () => {
    const result = mapValues({ a: 1, b: 2, c: 3 }, (x) => x + 1);

    expect(result).toEqual({ a: 2, b: 3, c: 4 });
  });

  it('should map strings', () => {
    const result = mapValues({ a: 'x', b: 'y', c: 'z' }, (x) => x.concat('l'));
    expect(result).toEqual({ a: 'xl', b: 'yl', c: 'zl' });
  });

  it('should map booleans', () => {
    const result = mapValues({ a: true, b: false, c: true }, (x) => !x);
    expect(result).toEqual({ a: false, b: true, c: false });
  });
});
