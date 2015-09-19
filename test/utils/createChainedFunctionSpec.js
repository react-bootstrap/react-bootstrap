/* eslint no-new-func: 0 */
import createChainedFunction from '../../src/utils/createChainedFunction';

describe('createChainedFunction', () => {
  it('returns null with no arguments', () => {
    expect(createChainedFunction()).to.equal(null);
  });

  it('returns original function when single function is provided', () => {
    const func1 = sinon.stub();
    createChainedFunction(func1).should.equal(func1);
  });

  it('wraps two functions with another that invokes both when called', () => {
    const func1 = sinon.stub();
    const func2 = sinon.stub();
    const chained = createChainedFunction(func1, func2);

    chained
      .should.not.equal(func1)
      .and.should.not.equal(func2);

    func1.should.not.have.been.called;
    func2.should.not.have.been.called;

    chained();

    func1.should.have.been.calledOnce;
    func2.should.have.been.calledOnce;
  });

  it('wraps multiple functions and invokes them in the order provided', () => {
    const results = [];
    const func1 = () => results.push(1);
    const func2 = () => results.push(2);
    const func3 = () => results.push(3);
    const chained = createChainedFunction(func1, func2, func3);
    chained();
    results.should.eql([1, 2, 3]);
  });

  it('forwards arguments to all chained functions', () => {
    const in1 = 'herpa derpa';
    const in2 = {
      herpa: 'derpa'
    };

    const func = (arg1, arg2) => {
      arg1.should.equal(in1);
      arg2.should.equal(in2);
    };

    const chained = createChainedFunction(func, func, func);
    chained(in1, in2);
  });

  it('throws when func is not provided', () => {
    expect(() => {
      createChainedFunction({ herpa: 'derpa' });
    }).to.throw(/Invalid Argument Type/);
  });

  it('works with new Function call', () => {
    const results = [];
    const func1 = new Function('results', 'results.push(1);');
    const func2 = new Function('results', 'results.push(2);');
    const chained = createChainedFunction(func1, func2);
    chained(results);
    results.should.eql([1, 2]);
  });
});
