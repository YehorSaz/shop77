import 'moment/locale/uk';

import moment from 'moment';

export function useTitle(): string {
  return moment().format('LLL').replace(' р.,', '');
}
