import post, { IPostProps } from './post-file';
import mockXHR from 'xhr-mock';

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

const option: IPostProps = {
  filename: 'foo',
  file: mockFile,
  action: '/',
  onError: () => {},
  onProgress: () => {},
  onSuccess: () => {},
};

describe('post file', () => {
  beforeEach(() => {
    mockXHR.setup();
  });
  afterEach(() => {
    mockXHR.teardown();
  });

  it('upload request success', done => {
    mockXHR.post('/', {
      body: JSON.stringify({
        success: true,
      }),
    });
    option.onSuccess = res => {
      expect(res).toEqual({ success: true });
      done();
    };
    option.onProgress = event => {
      expect(event.loaded).toEqual(0);
    };
    post(option);
  });

  it('append form data success', () => {
    mockXHR.post('/', req => {
      const data = req.body() as FormData;
      expect(data.get('name')).toEqual('upload');
      return new Promise(() => {});
    });
    option.data = {
      name: 'upload',
    };
    option.withCredentials = true;
    const { abort } = post(option);
    abort();
  });

  it('upload request fail', done => {
    mockXHR.post('/', () => Promise.reject(new Error())).error(() => {});
    option.onError = () => {
      done();
    };
    post(option);
  });

  it('2xx code should be success', done => {
    mockXHR.post('/', {
      status: 204,
    });
    option.onSuccess = () => {
      done();
    };
    post(option);
  });

  it('4xx code should be fail', done => {
    mockXHR.post('/', {
      status: 404,
    });
    option.onError = () => {
      done();
    };
    post(option);
  });

  it('set headers success', () => {
    mockXHR.post('/', req => {
      expect(req.headers()['from']).toEqual('hello');
      return new Promise(() => {});
    });
    option.headers = {
      from: 'hello',
    };
    post(option);
  });
});
