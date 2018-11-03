import { setDeep, PATH_MAX_DEPTH, pathMaxErrorMessage } from './setDeep';

describe('SetDeep', function() {
  it('should throw error when PATH_MAX_DEPTH exceeded', () => {
    // act
    const payload = {
      path: 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };

    function runSetDeep() {
      setDeep(existing_state, payload);
    }

    // assert
    expect(runSetDeep).toThrowError(
      pathMaxErrorMessage({ update_path_length: 15, PATH_MAX_DEPTH })
    );
  });

  it('should set deep in root of state', () => {
    // act
    const payload = {
      data: {
        foo: 'bar',
        bar: 'foow'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(existing_state, payload);
    // assert
    expect(subject).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set deep in root of state with any command', () => {
    // act
    const payload = {
      command: '$set',
      data: {
        foo: 'bar',
        bar: 'foow'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(existing_state, payload);
    // assert
    expect(subject).toEqual({
      ...payload.data
    });
    // should wipe existing_state since we use $set
    expect(subject).not.toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 1 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: existing_state
      },
      payload
    );
    // assert
    expect(subject.foo).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 2 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo.bar',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: {
          bar: existing_state
        }
      },
      payload
    );
    // assert
    expect(subject.foo.bar).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 3 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo.bar.jar',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: {
          bar: {
            jar: existing_state
          }
        }
      },
      payload
    );
    // assert
    expect(subject.foo.bar.jar).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 4 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo.bar.jar.far',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: {
          bar: {
            jar: {
              far: existing_state
            }
          }
        }
      },
      payload
    );
    // assert
    expect(subject.foo.bar.jar.far).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 5 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo.bar.jar.far.are',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: {
          bar: {
            jar: {
              far: {
                are: existing_state
              }
            }
          }
        }
      },
      payload
    );
    // assert
    expect(subject.foo.bar.jar.far.are).toEqual({
      ...existing_state,
      ...payload.data
    });
  });

  it('should set 6 levels deep in state', () => {
    // act
    const payload = {
      path: 'foo.bar.jar.far.are.tar',
      data: {
        foo: 'bar'
      }
    };
    const existing_state = {
      state: 'property'
    };
    const subject = setDeep(
      {
        foo: {
          bar: {
            jar: {
              far: {
                are: { tar: existing_state }
              }
            }
          }
        }
      },
      payload
    );
    // assert
    expect(subject.foo.bar.jar.far.are.tar).toEqual({
      ...existing_state,
      ...payload.data
    });
  });
});
