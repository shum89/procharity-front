import ky from 'ky';

const devLocation = process.env.NODE_ENV === 'development' || window.location.origin === 'http://178.154.202.217';

export const apiUrl = devLocation ? process.env.REACT_APP_API_DEV_ADDRESS : process.env.REACT_APP_API_ADDRESS;

export const api = ky.extend({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('user') ?? ''}`,
  },
  throwHttpErrors: false,
  retry: {
    limit: 2,
    methods: ['get', 'post'],
    statusCodes: [401, 422],
  },
  hooks: {
    beforeRetry: [
      // eslint-disable-next-line consistent-return
      async ({ request, options, error, retryCount }) => {
        if (retryCount === 1) {
          localStorage.setItem('user', JSON.stringify(null));
          localStorage.setItem('refresh_token', JSON.stringify(null));
          window.history.go();
          return ky.stop;
        }
      },
    ],
    afterResponse: [
      // eslint-disable-next-line consistent-return
      async (request, options, res) => {
        const refreshToken = localStorage.getItem('user');

        if (res.status === 401 || res.status === 422) {
          const resp = await ky.post(`${apiUrl}/auth/token_refresh/`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (resp.status === 200) {
            const token = await resp.json();
            request.headers.set('Authorization', `Bearer ${token.access_token}`);
            return ky(request);
          }
          if (resp.status === 401 || resp.status === 422) {
            localStorage.setItem('user', JSON.stringify(false));
            localStorage.setItem('refresh_token', JSON.stringify(false));
            window.history.go();
          }
        }
      },
    ],
  },
});
