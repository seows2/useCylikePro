import {
  Selectors,
  StringSelector,
  UrlSelector,
  CssSelector,
  FunctionSelector,
} from "../../src/lib/e2e-selector";

import { e2e } from "../index";

import { fromBaseUrl } from "./url";
import { Selector } from "./selector";

type CypressOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
>;

type VisitFunction = (
  args?: string,
  queryParams?: object
) => Cypress.Chainable<Window>;

type E2EVisit = { visit: VisitFunction };

type E2EFunction = ((
  text?: string,
  options?: CypressOptions
) => Cypress.Chainable<JQuery<HTMLElement>>) &
  E2EFunctionWithOnlyOptions;

type E2EFunctionWithOnlyOptions = (
  options?: CypressOptions
) => Cypress.Chainable<JQuery<HTMLElement>>;

type E2EFactoryArgs<S extends Selectors> = { selectors: S };

type TypeSelectors<S> = S extends StringSelector
  ? E2EFunctionWithOnlyOptions
  : S extends FunctionSelector
  ? E2EFunction
  : S extends CssSelector
  ? E2EFunction
  : S extends UrlSelector
  ? E2EVisit & Omit<E2EFunctions<S>, "url">
  : S extends Record<any, any>
  ? E2EFunctions<S>
  : S;

export type E2EFunctions<S extends Selectors> = {
  [P in keyof S]: TypeSelectors<S[P]>;
};

const processSelectors = <S extends Selectors>(
  e2eObjects: E2EFunctions<S>,
  selectors: S
): E2EFunctions<S> => {
  const logOutput = (data: any) => e2e().logToConsole("[Selector]: ", data);
  const keys = Object.keys(selectors);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = selectors[key];

    if (key === "url") {
      // @ts-ignore
      e2eObjects.visit = (args?: string, queryParams?: object) => {
        let parsedUrl = "";
        if (typeof value === "string") {
          parsedUrl = fromBaseUrl(value);
        }

        if (typeof value === "function" && args) {
          parsedUrl = fromBaseUrl(value(args));
        }

        e2e().logToConsole("[Visiting]: ", parsedUrl);
        if (queryParams) {
          return e2e().visit({ url: parsedUrl, qs: queryParams });
        }
        return e2e().visit(parsedUrl);
      };

      continue;
    }

    if (typeof value === "string") {
      // @ts-ignore
      e2eObjects[key] = (options?: CypressOptions) => {
        logOutput(value);
        const selector = Selector.fromDataTestId(value);

        return e2e().get(selector, options);
      };

      continue;
    }

    if (typeof value === "function") {
      // @ts-ignore
      e2eObjects[key] = function (
        textOrOptions?: string | CypressOptions,
        options?: CypressOptions
      ) {
        // input이 ()
        if (arguments.length === 0) {
          const selector = value(undefined as unknown as string);
          logOutput(selector);
          return e2e().get(selector);
        }

        // input이 (text) 또는 (options)
        if (arguments.length === 1) {
          if (typeof textOrOptions === "string") {
            // input이 (text)일 때
            const selectorText = value(textOrOptions);
            const selector = Selector.fromDataTestId(selectorText);
            logOutput(selector);
            return e2e().get(selector);
          }
          // input이 (options)일 때
          const selector = value(undefined as unknown as string);
          logOutput(selector);
          return e2e().get(selector, textOrOptions);
        }

        // input이 (text, options)
        if (arguments.length === 2 && typeof textOrOptions === "string") {
          const text = textOrOptions;
          const selectorText = value(text);
          const selector = Selector.fromDataTestId(selectorText);

          logOutput(selector);
          return e2e().get(selector, options);
        }

        return undefined;
      };
      continue;
    }

    if (typeof value === "object") {
      // @ts-ignore
      e2eObjects[key] = processSelectors({}, value);
    }
  }

  return e2eObjects;
};

export const e2eFactory = <S extends Selectors>({
  selectors,
}: E2EFactoryArgs<S>) => {
  const e2eObjects: E2EFunctions<S> = {} as E2EFunctions<S>;
  processSelectors(e2eObjects, selectors);

  return { ...e2eObjects };
};
