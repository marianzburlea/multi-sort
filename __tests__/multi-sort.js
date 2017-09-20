import multiSort from '../multi-sort.js';

test('sort string list', () => {
  const data = [{name: 'abc'}, {name:'cbc'}, {name:'abb'}];
  const sortList = [
    {
      direction: 1,
      property: 'name'
    }
  ];
  const result = multiSort({data, sortList});
  const expected = [{name: 'abb'}, {name:'abc'}, {name:'cbc'}];
  expect(result).toEqual(expected);
});

test('sort string list descendant', () => {
  const data = [{name: 'abc'}, {name:'cbc'}, {name:'abb'}];
  const sortList = [
    {
      direction: -1,
      property: 'name'
    }
  ];
  const result = multiSort({data, sortList});
  const expected = [{name:'cbc'}, {name:'abc'}, {name: 'abb'}];
  expect(result).toEqual(expected);
});

test('sort number list', () => {
  const sortList = [
    {
      direction: 1,
      property: 'value'
    }
  ];
  const data = [{value:2}, {value:3}, {value:11}, {value:1}];
  const result = multiSort({data, sortList});
  const expected = [{value:1}, {value:2}, {value:3}, {value:11}];
  expect(result).toEqual(expected);
});

test('sort number list descendant', () => {
  const sortList = [
    {
      direction: -1,
      property: 'value'
    }
  ];
  const data = [{value:2}, {value:3}, {value:11}, {value:1}];
  const result = multiSort({data, sortList});
  const expected = [{value:11}, {value:3}, {value:2}, {value:1}];
  expect(result).toEqual(expected);
});

test('sort by id', () => {
  const sortList = [
    {
      direction: 1,
      property: 'id',
      ignoreCase: true
    }
  ];
  const data =  [
    { id: 7, name:  "London", population: 7500000, country: "UK" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
    { id: 43, name: "Brighton", population: 600000, country: "UK" },
    { id: 5, name:  "Bucuresti", population: 3000000, country: "Romania" },
    { id: 42, name: "Constanta", population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara", population: 600000, country: "Romania" },
  ];
  const result = multiSort({data, sortList});
  const expected = 5;
  expect(result[0].id).toEqual(expected);
});

test('sort by country', () => {
  const sortList = [
    {
      direction: 1,
      property: 'country'
    }
  ];
  const data =  [
    { id: 7, name:  "London", population: 7500000, country: "UK" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
    { id: 43, name: "Brighton", population: 600000, country: "UK" },
    { id: 5, name:  "Bucuresti", population: 3000000, country: "Romania" },
    { id: 42, name: "Constanta", population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara", population: 600000, country: "Romania" },
  ];
  const result = multiSort({data, sortList});
  const expected1 = 'Romania';
  const expected2 = 'UK';
  expect(result[0].country).toEqual(expected1);
  expect(result[5].country).toEqual(expected2);
});

test('sort by country, then by population', () => {
  const sortList = [
    {
      direction: 1,
      property: 'country'
    },
    {
      direction: 1,
      property: 'population'
    }
  ];
  const data =  [
    { id: 7, name:  "London", population: 7500000, country: "UK" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
    { id: 43, name: "Brighton", population: 600000, country: "UK" },
    { id: 5, name:  "Bucuresti", population: 3000000, country: "Romania" },
    { id: 42, name: "Constanta", population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara", population: 600000, country: "Romania" },
  ];
  const dataExpected =  [
    { id: 42, name: "Constanta", population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara",  population: 600000, country: "Romania" },
    { id: 5, name:  "Bucuresti",  population: 3000000, country: "Romania" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
    { id: 43, name: "Brighton",   population: 600000, country: "UK" },
    { id: 7, name:  "London",  population: 7500000, country: "UK" },
     ];
  const result = multiSort({data, sortList});
  const expected1 = 42;
  const expected2 = 7;
  expect(result[0].id).toEqual(expected1);
  expect(result[5].id).toEqual(expected2);
  expect(result).toEqual(dataExpected);
});

test('sort by country name length', () => {
  const sortList = [
    {
      direction: 1,
      property: (v1, v2) => v1.name.length  - v2.name.length
    },
    {
      direction: 1,
      property: 'population'
    }
  ];
  const data =  [
    { id: 7, name:  "London", population: 7500000, country: "UK" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
    { id: 43, name: "Brighton", population: 600000, country: "UK" },
    { id: 5, name:  "Bucuresti", population: 3000000, country: "Romania" },
    { id: 42, name: "Constanta", population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara", population: 600000, country: "Romania" },
  ];
  const dataExpected =  [
    { id: 7, name:  "London",     population: 7500000, country: "UK" },
    { id: 43, name: "Brighton",   population: 600000, country: "UK" },
    { id: 42, name: "Constanta",  population: 550000, country: "Romania" },
    { id: 44, name: "Timisoara",  population: 600000, country: "Romania" },
    { id: 5, name:  "Bucuresti",  population: 3000000, country: "Romania" },
    { id: 12, name: "Birmingham", population: 450000, country: "UK" },
  ];
  const result = multiSort({data, sortList});
  expect(result).toEqual(dataExpected);
});
