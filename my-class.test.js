import { jest } from '@jest/globals';

jest.mock('./my-class.js', () => {
  const instance = {
    someMethod: () => 'mocked-value',
  };
  return {
    __esModule: true,
    MyClass: jest.fn().mockImplementation(() => instance),
    foo: 'bar',
  };
});

import * as MyClassModule from './my-class.js';

describe('it does not work', () => {
  test('exported things', () => {
    expect(MyClassModule.foo).toEqual('bar');
  });

  test('mocked out instance methods', async () => {
    const m = await import('./my-class');
    const instance = new m.MyClass();
    expect(instance.someMethod()).toEqual('mocked-value');
  });

  test('dynamically imported', async () => {
    const m = await import('./my-class');
    const instance = new m.MyClass();
    expect(instance.someMethod()).toEqual('mocked-value');
  });
});

