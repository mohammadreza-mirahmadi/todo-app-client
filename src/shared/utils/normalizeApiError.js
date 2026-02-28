const normalizeApiError = (error) => {
  // Network | timeout | no response
  if (!error.response) {
    return {
      message: "Network error. Please check your connection.",
      status: 0,
      code: "NETWORK_ERROR",
      isNetworkError: true,
    };
  }

  const { status, data } = error.response;

  const message =
    data?.message ||
    (status === 401 && "Unauthorized access") ||
    (status === 403 && "Forbidden") ||
    (status === 404 && "Resource not found") ||
    (status >= 500 && "Server error. Please try again later.") ||
    "Unexpected error occurred.";

  return {
    message,
    status,
    isNetworkError: false,
  };
};

export default normalizeApiError;
