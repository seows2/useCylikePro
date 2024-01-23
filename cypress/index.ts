import { selectors } from "../src/lib/e2e-selector";
import { e2eFactory } from "./support";
import * as flows from "./flows";

const e2eObject = {
  env: (args: string) => Cypress.env(args),
  config: () => Cypress.config(),
  pages: e2eFactory?.({ selectors: selectors.pages }),
  flows,
};

export const e2e: (() => Cypress.cy) & typeof e2eObject = Object.assign(
  () => cy,
  e2eObject
);
