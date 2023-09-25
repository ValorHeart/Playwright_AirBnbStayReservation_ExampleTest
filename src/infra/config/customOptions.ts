// Custom options types
export interface TestExecutionContext {
  baseURL: string;
  browsers: 'Chrome'[];
  headless: boolean;
}

// Custom options
export type CustomOptions = {
  testExecutionContext: TestExecutionContext;
};

// Custom options defaults
const defaultTestExecutionContext: TestExecutionContext = {
  baseURL: '',
  browsers: ['Chrome'],
  headless: true,
};

export const defaults = {
  defaultTestExecutionContext: defaultTestExecutionContext,
};
