export function getHttpErrorData(error) {
  return error && error.response && error.response.data;
}

export function getHttpErrorMessage(
  error,
  defaultMessage = 'An error occurred.'
) {
  const errData = getHttpErrorData(error);
  return (errData && errData.message) || defaultMessage;
}
