
export const getUserId = () => {
    return localStorage.getItem('userId');
}

export const getJwtToken = () => {
    return localStorage.getItem('jwt');
}

export const axiosBaseQuery =
({ baseUrl, headers } = { baseUrl: '' }) =>
async ({ url, method = 'GET', ...rest }) => {
  try {
    const result = await axios({
      baseURL: baseUrl,
      url,
      method,
      ...rest,
      headers: {
        ...headers,
        ...rest.headers,
      },
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};
