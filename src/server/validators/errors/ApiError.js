export class ApiError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  sendResponse(res) {
    return res.status(this.status).json({ message: this.message });
  }
}

export class BadRequestApiError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class GitActionError extends ApiError {
  constructor(message = 'Git Error') {
    super(400, message);
  }
}

export class NotFoundApiError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}
