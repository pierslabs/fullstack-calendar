export const initalState = {
  status: 'not-authorize',
  user: {},
  errorMessage: undefined,
};

export const checkingState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const athenticatedState = {
  status: 'athenticated',
  user: {
    name: 'Test user',
    uid: '73c5b6377e908d2ca6149lki',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};
