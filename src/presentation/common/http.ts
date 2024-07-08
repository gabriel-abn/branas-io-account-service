export type HttpRequest<T = any> = {
  body: T;
  query?: { [key: string]: any };
  params?: { [key: string]: any };
};

export type HttpResponse = {
  body: any;
  status: number;
  success: boolean;
};

export const success = (body: any, status = 200): HttpResponse => ({
  body,
  status,
  success: true,
});

export const badRequest = (body: any, status = 400): HttpResponse => ({
  body,
  status,
  success: false,
});

export const serverError = (body: any, status = 500): HttpResponse => ({
  body,
  status,
  success: false,
});
