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
| `POST /api/login` | Authentication, Rate Limit, Security (XSS, SQLi), Headers | Header security leaks (`X-Powered-By`) and missing Rate Limit enforcement (401 instead of 429). |
| `GET /api/users` | Token Authorization (Valid, Missing, Invalid, Expired) | Passes authorization checks correctly. |
| `POST /api/add-user` | Payload Validation, Schema Matching, Boundary Check (255/256 chars), Duplicate Username | **API Contract Discrepancy:** The documentation mixes `age` types (`string` in JSON example vs `number` in cURL example). |

---

## ⚠️ API Contract & Test Anomaly Note (POST /api/add-user)
> On the official documentation page, `age` is defined as a `String` in the primary JSON payload (`"34"`), but specified as a `Number` in the cURL example (`30`). The test suite intentionally tests payload type variations, causing schema validation failures (400) before reaching downstream database validations (409 Conflict).