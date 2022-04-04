import { ApiResponse } from '../../common/api';
import { CategoryApi } from '../api/client';

/**
 *Fetch  all production categories
 *
 * @param id
 * @returns
 */
export const getAllProductionCategories = async (
  id: string,
): Promise<string> => {
  let response: ApiResponse<CategoryApi> | null = null;
  try {
    response = await CategoryApi.getProductionCategories(id);
  } catch ({ response: responseError, stack, isAxiosError, ...rest }) {
    throw new Error('Cannot reach API');
  }

  if (response) {
    return JSON.stringify(response.data);
  }

  throw new Error('Empty response from API');
};
