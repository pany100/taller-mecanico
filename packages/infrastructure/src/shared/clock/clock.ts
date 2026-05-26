import { type Clock } from '@taller/application';

export const clock: Clock = {
  now: () => new Date(),
};
