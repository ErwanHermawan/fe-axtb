/* ------------------------------------------------------------------------------
@name: API_URL
@description: API_URL
--------------------------------------------------------------------------------- */

const URL_BASE = 'https://x-api.alpha-x.id/';

export const API_URL = {
  login: `${URL_BASE}v1/login`,
  registration: `${URL_BASE}v1/registration`,
  product: `${URL_BASE}v1/product`,
  productDetail: (alias) => {
    return `${URL_BASE}v1/product/${alias}`
  },
  orderCart: `${URL_BASE}v1/order/cart`,
  orderAdd: `${URL_BASE}v1/order/add`,
  orderDelete: `${URL_BASE}v1/order/delete`,
  orderEdit: `${URL_BASE}v1/order/edit`
}
