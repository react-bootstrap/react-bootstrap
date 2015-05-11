export function shouldWarn(about) {
  console.warn.called.should.be.true;
  console.warn.calledWithMatch(about).should.be.true;
  console.warn.reset();
}
