import { classNames } from 'helpers/classNames/classNames';
import { describe, expect, test } from 'vitest';

describe('classNames function', () => {
  test('with only one parametr', () => {
    expect(classNames('testClassName')).toBe('testClassName');
  });

  test('basic classname with additional params array', () => {
    expect(classNames('testClassName', {}, ['class1', 'class2'])).toBe(
      'testClassName class1 class2',
    );
  });

  test('basic classname with additional params array', () => {
    expect(classNames('testClassName', { hot: false, falsy: false }, ['class1', 'class2'])).toBe(
      'testClassName class1 class2',
    );
  });

  test('basic classname with additional params array and mods', () => {
    expect(classNames('testClassName', { hot: true, falsy: false }, ['class1', 'class2'])).toBe(
      'testClassName class1 class2 hot',
    );
  });

  test('basic classname with additional params array and all true mods', () => {
    expect(classNames('testClassName', { hot: true, falsy: true }, ['class1', 'class2'])).toBe(
      'testClassName class1 class2 hot falsy',
    );
  });
});
