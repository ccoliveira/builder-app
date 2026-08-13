import localeEN from './en';
import enLocale from 'element-ui/lib/locale/lang/en';

import localePTBR from './pt-br';
import elementLocalePTBR from 'element-ui/lib/locale/lang/pt-br';

import localeES from './es';
import esLocale from 'element-ui/lib/locale/lang/es';

import app from '../app/i18nApp';

const messages = {
  en: {
    ...localeEN,
    ...enLocale,
    ...app.en
  },
  pt: {
    ...localePTBR,
    ...elementLocalePTBR,
    ...app.pt
  },
  es: {
    ...localeES,
    ...esLocale,
    ...app.es
  }
};

export default {
  ...messages
}
