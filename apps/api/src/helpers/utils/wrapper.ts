import { type Meta } from '@repo/entities/base';
import { type Response } from 'express';
import { HttpError } from './error';

class Wrapper {
  response(res: Response, status: number, data: any): void {
    res.status(status).json({
      success: true,
      code: status,
      ...data,
    });
  }

  responseError(res: Response, classError: Partial<HttpError>): void {
    const code = typeof classError.code === 'number' ? classError.code : 500;

    res.status(code).json({
      success: false,
      code: code,
      data: classError.data || null,
      message: classError.message || 'Terjadi kesalahan sistem, silakan coba beberapa saat lagi',
    });
  }

  data<T = any>(
    data: T,
    meta: Meta | null = null,
    message: string | null = null,
  ): { err: string | null; data: T; meta: Meta | null } {
    return { err: message, data, meta };
  }

  error<T = any>(
    message: string | Partial<HttpError>,
    data: T | null = null,
  ): { err: string | Partial<HttpError>; data: T | null } {
    return { err: message, data };
  }
}

export default new Wrapper();
