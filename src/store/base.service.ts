import { ErrorResponse, HeaderResponse } from '../domain/shared/errorResponse';
import { QueryStatusType } from '../domain/shared/queryStatusType';
import { ErrorObject } from '../domain/shared/error';
import { Result } from '../domain/shared/result';
import { BASE_API, STORAGE_KEY } from './types';
import axios from 'axios';

export default class BaseService {
  protected async getMethod(url: string, params = null) {
    let qs = '';
    if (params) {
      qs = this.getParamsQs(params);
    }

    try {
      const queryPromise = axios.get(`${BASE_API}${url}${qs}`, {
        headers: await this.getHeaders()
      });

      const query: Result = await Promise.resolve(queryPromise);

      if (query.statusText === QueryStatusType.OK) {
        return query.data;
      }
      return {};
    } catch (error) {
      this.catchError(error as ErrorObject);
    }
  }

  protected async postMethod(url: string, params) {
    params = JSON.stringify(params);

    try {
      const queryPromise = axios.post(`${BASE_API}${url}`, params, {
        headers: await this.getHeaders()
      });

      const query = await Promise.resolve(queryPromise);

      if (query.statusText === QueryStatusType.OK) {
        return query.data;
      }
      return {};
    } catch (error) {
      this.catchError(error as ErrorObject);
    }
  }

  protected async deleteMethod(url: string, params) {
    try {
      const queryPromise = axios.delete(`${BASE_API}${url}`, {
        headers: await this.getHeaders()
      });

      const query: Result = await Promise.resolve(queryPromise);

      if (query.statusText === QueryStatusType.OK) {
        return query.data;
      }
      return {};
    } catch (error) {
      this.catchError(error as ErrorObject);
    }
  }

  protected async putMethod(url, params) {
    try {
      const queryPromise = axios.put(`${BASE_API}${url}`, params, {
        headers: await this.getHeaders()
      });

      const query: Result = await Promise.resolve(queryPromise);

      if (query.statusText === QueryStatusType.OK) {
        return query.data;
      }
      return {};
    } catch (error) {
      this.catchError(error as ErrorObject);
    }
  }

  private getParamsQs(obj) {
    return Object.keys(obj).reduce(function (str, key, i) {
      var delimiter, val;
      delimiter = i === 0 ? '?' : '&';
      key = encodeURIComponent(key);
      val = encodeURIComponent(obj[key]);
      if (val && val.length > 0) {
        return [str, delimiter, key, '=', val].join('');
      } else {
        return str;
      }
    }, '');
  }

  private async getHeaders() {
    const dataStored = await localStorage.getItem(STORAGE_KEY);

    const store = JSON.parse(dataStored ?? '');
    const token = await store?.login?.token;
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token ? token : null}`
    };
  }

  private catchError(error: ErrorObject) {
    if (error.response) {
      // Request made and server responded

      throw new ErrorResponse(
        error.response.data?.header?.status as HeaderResponse,
        error.response.data?.body,
        error.response.status
      );
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}
