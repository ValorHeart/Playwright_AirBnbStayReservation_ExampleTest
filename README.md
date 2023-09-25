## Airbnb stay reservation test

**Author:** Adi Gal \
**Framework:** Playwright Test \
**Coding language:** JavaScript + TypeScript

### Test recipe

- [1] Search for a Stay
- [2] Select a Listing
- [3] Confirm Booking Details
- [4] Adjust and Verify Guest Count
- [5] Change Booking Dates
- [6] Reserve and Validate

### Pre-requisites

- NodeJS \> 18.16.1

### 📦 Installation

- `npm install`

### 🧪 Test Execution

- `npm run test:playwright`

### 📐 Architecture

#### Infra folder

**Folder:** `config` - Contains the test execution configuration boilerplate.\
**Folder:** `fixture` - Contains an extention to Playwright's 'test' base, adding Fixtures and Configuration options.\
**Folder:** `helpers` - Contains reusable web components to support the tests.\
**Folder:** `utils` - Contains general utility classes to support the tests.

#### Tests folder

**Folder:** `pages` - Contains page object models to support multiple tests using the same reusable operations on the web applicartion.\
**Folder:** `tests` - Contains the tests themselves.

---

### Configuration

📝 You'll find playwright.config.ts file which configures the test base url, browser and headless mode.

📝 The test execution scrips are store in the package.json

📝 Test execution results are being saved to `execution-results` in sibling to the tests folder
