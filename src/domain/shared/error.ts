export class ErrorObject {
  public response: Response;
  public request: Request;
  public message: string;
  public code: string;
  public status: number;
  public name: string;
  public config: any;
}

class Response {
  public data: any;
  public status: any;
  public headers: any;
}

class Request {}
