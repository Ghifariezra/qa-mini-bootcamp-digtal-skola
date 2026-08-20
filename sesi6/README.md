# API Automation Testing Suite - Season 6 Homework

This repository contains automated test scripts (*API Test Automation*) for the **Belajar Bareng API** platform using **Mocha**, **Chai**, and **Ajv Schema Validator**.

📂 **Direct Link to Test Suite:** [Homework Test Directory](./tests/homework)

---

## 🛠️ Tech Stack & Tools

* **Test Framework:** Mocha
* **Assertion Library:** Chai
* **Schema Validation:** Ajv (JSON Schema Validator)
* **Reporter:** Mochawesome
* **HTTP Client:** Custom Fetch wrapper (`src/fetch.js`)

---

## 📁 Project Structure

```text
.
├── src/
│   ├── data/            # Dynamic & Static Payload Data
│   │   ├── login.data.js
│   │   └── users.data.js
│   ├── schema/          # JSON Schema Validation Definitions
│   │   ├── login.schema.js
│   │   └── user.schema.js
│   ├── belajar.bareng.js
│   └── fetch.js
│
└── tests/
    ├── homework/        # 🎯 Core Homework Test Files
    │   ├── modules/
    │   │   ├── add.users.test.js   # POST /api/add-user tests
    │   │   ├── login.test.js       # POST /api/login tests
    │   │   └── users.test.js       # GET /api/users tests
    │   └── main.test.js            # Main Test Runner
    └── practice/        # Practice Test Files
```

---

## 🚀 How to Run Tests

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Test Suites (Terminal Output)
* **Homework Test Suite (Tugas Utama):**
  ```bash
  npm run test:homework
  ```
* **Practice Test Suite:**
  ```bash
  npm run test:practice
  ```
* **Run All Tests:**
  ```bash
  npm run test:all
  ```

### 3. Run Tests with Mochawesome HTML Report
* **Generate Report for Homework:**
  ```bash
  npm run test:report-homework
  ```
* **Generate Report for Practice:**
  ```bash
  npm run test:report-practice
  ```
* **Generate Report for All Tests:**
  ```bash
  npm run test:report-all
  ```

---

## 📌 Key Test Scenarios & QA Observations

You can view full execution details in the [Mochawesome HTML Report](./mochawesome-report/mochawesome.html) or check the test case details on the [Google Sheet](https://docs.google.com/spreadsheets/d/1prVkHbX9d5SIf_LyAhv5533UEPlWc1il_7CjEGS2PDE/edit?usp=sharing) *(Note: test cases are currently being aligned with API best-practice templates)* on the Google Sheet you can to see *Bug Reports* between sheet.

| Endpoint | Test Focus | Key QA Finding / Anomaly |
| :--- | :--- | :--- |
| `POST /api/login` | Authentication, Rate Limit, Security (XSS, SQLi), Headers | Security header policy tests are **skipped** as expected header rules are unspecified in the API contract. Rate limit tests are backlogged. Validation error for missing fields was aligned to `"Username or password is required".` |
| `GET /api/users` | All token authorization validations pass as expected. |
| `POST /api/add-user` | Updated age payload field to Number to align with backend validation requirements (`"Age must be numeric, not text!"`). |

---

## ⚠️ API Contract & Test Anomaly Note

* **POST /api/add-user (`age` payload type):**
The initial API documentation shows conflicting representations for `age` (`String` `"34"` in the JSON payload example versus `Number` in the cURL command). The backend server strictly enforces `Number.` The test suite and JSON Schema were updated to Number to pass validation.
* **POST /api/login (Skipped Suites):**
  - **Header Policy:** Temporarily skipped (`describe.skip`) because the API specification does not explicitly define expected security header rules (e.g., `X-Powered-By`, `Access-Control-Allow-Origin`).
  - **Rate Limiting:** Skipped (`describe.skip`) and backlogged pending further configuration clarification.