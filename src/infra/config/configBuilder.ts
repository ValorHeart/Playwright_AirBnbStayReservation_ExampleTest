import baseConfig from './baseConfig';
import { type TestExecutionContext, type CustomOptions } from './customOptions';
import { setTextExecutionContext } from './configBuilderHelper';
import { type PlaywrightTestConfig } from '@playwright/test';

export class ConfigBuilder {
  private config: PlaywrightTestConfig<CustomOptions>;

  constructor() {
    this.config = structuredClone(baseConfig);
  }

  public setTestExecutionContext(testExecutionContext: TestExecutionContext): ConfigBuilder {
    this.config.use = {
      ...this.config.use,
      testExecutionContext,
    };

    return this;
  }

  public build() {
    if (!this.config.use?.testExecutionContext) {
      throw new Error('Please define textExecutionContext in your playwright config file.');
    }

    const newConfig = setTextExecutionContext(this.config, this.config.use.testExecutionContext);

    return newConfig;
  }
}
