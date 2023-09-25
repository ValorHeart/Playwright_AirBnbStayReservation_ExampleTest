import { ConfigBuilder } from '../../infra';

const config = new ConfigBuilder()
  .setTestExecutionContext({
    baseURL: 'https://www.airbnb.com/',
    browsers: ['Chrome'],
    headless: false,
  })
  .build();

export default config;
