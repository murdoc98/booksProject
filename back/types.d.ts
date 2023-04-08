
declare namespace Express {
  export interface Request {
    auth: {
      payload: {
        iss: string,
        sub: string
      }
    }
    oidc: {
      user: any
    }
  }
}