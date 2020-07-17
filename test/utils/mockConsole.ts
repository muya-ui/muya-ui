import sinon from 'sinon';

class MockConsole {
  _errorFn?: sinon.SinonStub;

  mockError() {
    this._errorFn = sinon.stub(console, 'error');
  }

  restoreError() {
    if (this._errorFn) {
      this._errorFn.restore();
    }
  }
}

export default new MockConsole();
