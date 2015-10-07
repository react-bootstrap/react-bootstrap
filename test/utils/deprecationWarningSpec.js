import deprecationWarning from '../../src/utils/deprecationWarning';

describe('deprecationWarning', () => {
  it('warns exactly once', () => {
    // console.error has already been stubbed out by test setup.

    deprecationWarning('foo', 'bar');
    expect(console.error).to.have.been.calledOnce;

    deprecationWarning('foo', 'bar');
    expect(console.error).to.have.been.calledOnce;

    // Reset the stub to avoid unhandled warnings.
    console.error.reset();
  });
});
