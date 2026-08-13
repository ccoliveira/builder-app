import { routes as auth } from './auth';
import { routes as example } from './example';
import { routes as formBuilder } from './formBuilder';
import { routes as businessLine } from './businessLine';
import { routes as businessRule } from './businessRule';
import { routes as contract } from './contract';
import { routes as form } from './form';
import { routes as menu } from './menu';
import { routes as home } from './home';
import { routes as user } from './user';
import { routes as userGroup } from './userGroup';
import { routes as template } from './template';
import { routes as configuration } from './configuration';
import { routes as email } from './email';
import { routes as scripts } from './scripts';
import { routes as scheduledTask } from './scheduledTask';

export default [
  ...auth,
  ...example,
  ...formBuilder,
  ...businessLine,
  ...businessRule,
  ...contract,
  ...form,
  ...menu,
  ...home,
  ...user,
  ...userGroup,
  ...template,
  ...configuration,
  ...email,
  ...scripts,
  ...scheduledTask
]
