import {
  IPersonMeResponse,
  ILocation,
  IConfigResponse,
  IPersonRegister,
  IPersonNew,
} from '../types';
import { endpoints } from './endpoints';
import { Fetcher } from '../../common/api';
import { errorFactory } from '../errors';
import { StringUtils } from '../../common/utils/string';
import { Pagination } from '../../common/api';
import { v4 as uuidv4 } from 'uuid';

const fetcher = new Fetcher(errorFactory);

class PersonApi {
  /**
   * Get Me.
   *
   * @static
   * @memberof PersonApi
   */
  public static getMe = () => fetcher.get<IPersonMeResponse>(endpoints.GET_ME);

  public static getPersonById = (id: string) =>
    fetcher.get<IPersonMeResponse>(
      StringUtils.bindContext(endpoints.GET_ONE_BY_USERID, { id }),
    );

  /**
   * Get Position with longitude and latitude
   *
   * @static
   * @memberof PersonApi
   */
  public static getCurrentAddress = (position: { [key: string]: string }) =>
    fetcher.get<Pagination<ILocation[]>>(endpoints.GET_POSITION, {
      position,
    });

  /**
   * Get list of person.
   *
   * @static
   * @memberof PersonApi
   */
  public static getPersons = (
    page: number,
    itemsPerPage = 10,
    filters: { [key: string]: string },
  ) =>
    fetcher.get<Pagination<IPersonMeResponse[]>>(endpoints.GET_PERSONS, {
      page,
      itemsPerPage,
      ...filters,
    });

  /**
   * Post register person with email & password.
   *
   * @static
   * @memberof PersonApi
   */
  public static postPersonRegister = (data: IPersonRegister) =>
    fetcher.post<IPersonRegister>(endpoints.POST_PERSON_REGISTER, {
      ...data,
      id: uuidv4(),
    });

  /**
   * Post add new person.
   *
   * @static
   * @memberof PersonApi
   */
  public static postPersonNew = (data: IPersonNew) =>
    fetcher.post<IPersonRegister>(endpoints.POST_PERSON_NEW, {
      ...data,
      id: uuidv4(),
    });

  public static getConfigs = () =>
    fetcher.get<IConfigResponse[]>(endpoints.GET_CONFIG);

  public static getVirtualMoney = () =>
    fetcher.get<IPersonMeResponse[]>(endpoints.GET_VIRTUAL_MONEY);
}

export { PersonApi };
