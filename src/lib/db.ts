import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDb() {
  return getRequestContext().env.DB;
}

export default getDb;
