export class ErrorResponse {
  constructor(public header: HeaderResponse, public body: string, public status: string | number) {}
}

export class HeaderResponse {
  public status: string;
  public description: string;
}
