export default {
  generalMessage: {
    error: 'There was some error',
    apiNotExist: 'Method does not exist',
    success: 'Success',
  },
  httpMessages: {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    544: 'Unknown HTTP Error',
  },
  auth: {
    failed: 'Either email or password is incorrect. Please try again',
    incorrectPassword: 'auth.incorrectPassword',
    userNotFound: 'User not found',
    invalidToken: 'Token invalid',
    invalidVerificationCode: 'verificationCode.invalid',
    expiredVerificationCode: 'verificationCode.expired',
    maxAttemptsReach: 'verificationCode.maxAttemptsReach',
    permissionDenied: 'Permission denied',
  },

  user: {
    exist: 'user.exist',
    notFound: 'user.notFound',
    passwordIncorrect: 'user.passwordIncorrect',
  },

  workspace: {
    exist: 'workspace.exist',
  },

  upload: {
    fileAvatarExtensionNotAllow: 'The file extension is not supported',
    uploadLimitExceeded: 'toast.upload.limitExceeded',
  },
};
