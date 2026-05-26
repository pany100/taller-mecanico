import { v7 as uuidv7 } from 'uuid';

import { type IdGenerator } from '@taller/application';

export const idGenerator: IdGenerator = {
  generate: () => uuidv7(),
};
