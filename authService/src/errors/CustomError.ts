



class CustomError extends Error {
    status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.name = 'CustomErrorClass';
      this.status = status;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
    }
  }


  export = CustomError

