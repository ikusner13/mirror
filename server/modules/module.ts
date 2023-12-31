/* eslint-disable perfectionist/sort-object-types */
export type Module = {
  init(): Promise<void>;
  start(): void;
  fetchAndSendEvents(): Promise<void>;
};
