const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Giulia',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Giulia&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Giulia',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Giulia&abilities=JS,TDD');
  });

  it('Should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Giulia',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
    it('Should convert a query string to object', () => {
        const qs = 'name=Giulia&profession=developer';
        expect(parse(qs)).toEqual({
            name: 'Giulia',
            profession: 'developer'
        });
    });

    it('Should convert a query string of a single key-value to object', () => {
        const qs = 'name=Giulia';
        expect(parse(qs)).toEqual({
            name: 'Giulia',
        });
    });

    it('Shoould convert a query string to an object taking care of comma separated values', () => {
        const qs = 'name=Giulia&abilities=JS,TDD'

        expect(parse(qs)).toEqual({
            name: 'Giulia',
            abilities: ['JS', 'TDD']
        });
    });
});
