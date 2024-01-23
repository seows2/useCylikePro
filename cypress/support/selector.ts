type SelectorApi = {
  fromDataTestId: (selector: string) => string;
};

export const Selector: SelectorApi = {
  fromDataTestId: (selector: string) => `[data-testid="${selector}"]`,
};
