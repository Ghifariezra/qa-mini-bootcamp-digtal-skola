# QA Engineer: Basic Automation & Testing (Batch 17)

![QA Automation](https://img.shields.io/badge/Role-QA_Engineer-blue)
![Batch](https://img.shields.io/badge/Batch-17-orange)
![Period](https://img.shields.io/badge/Period-30_Jul_2026_--_01_Sep_2026-green)
![Certification Track](https://img.shields.io/badge/Certification-ISTQB%C2%AE_FL_Track-purple)

This repository contains software test automation scripts, hands-on software testing practices, and comprehensive QA documentation completed during the **QA Engineer: Basic Automation & Testing Batch 17** program at Digital Skola (International Certification Track: **ISTQB® Foundation Level**).

---

## 👨‍🏫 Tutors & Mentors

* **M Ridhwan K** — QA Engineer at Food Discovery Company *(5+ years of experience)*
* **Candra Oktavianto** — Senior QA Engineer at PT. Agriaku Digital Indonesia *(10+ years of experience)*
* **Fina Rahmaniar** — QA Engineer at Advance Intelligence Group *(5+ years of experience)*

---

## 🛠️ Tech Stack & Tools

* **Programming Language:** JavaScript (Node.js)
* **API Testing & Automation:** Postman, Mocha, Chai, Ajv Schema Validator, Node-Fetch
* **UI Automation:** Selenium, WebdriverIO
* **Mobile Automation:** Appium, Android Studio
* **Performance Testing:** JMeter (Load Testing)
* **Version Control System:** Git, GitHub
* **Test Reporting:** Mochawesome
* **Visual Regression Testing:** canvas, pixelmatch

---

## 📚 Curriculum & Course Topics

The automation framework development and test scenarios are structured based on international **ISTQB® Foundation Level** standards:

1. **Introduction and Fundamentals in Quality Assurance**
2. **Testing & Bugs Management**
3. **Programming Fundamental**
4. **Programming Advance**
5. **Version Control System (GIT)**
6. **API Testing (Manual Testing)**
7. **API Automation Testing**
8. **Load & Performance Testing**
9. **Web UI Automation Fundamental**
10. **Web UI Automation Advance (Part 1)**
11. **Web UI Automation Advance (Part 2)**
12. **Mobile App Testing Fundamentals**
13. **Setting Up Mobile Automation with Appium**
14. **Advanced Mobile Testing with Appium**

---

## 📁 Repository Structure

```text
.
├── docs/             # 📑 QA Documentation (Test Plans, Test Cases & Bug Reports)
│   ├── api-automation/
│   └── manual-test/
├── sesi3/            # Programming Fundamental Practice
├── sesi4/            # Advanced Programming & Logic Practice
├── sesi5/            # Git & Manual API Testing Practice
├── sesi6/            # 🎯 API Testing Automation Suite (Mocha, Chai, Ajv)
├── sesi7/            # Automation & Performance Testing Practices
├── sesi8/            # 🌐 Web UI E2E Automation Suite (Selenium, POM) — Git Submodule
├── sesi10/           # 🌐 Web UI E2E Automation v2 (Selenium, POM, Visual Regression) — Git Submodule
├── sesi11/           # 📱 Mobile E2E Automation Suite (Appium, WebdriverIO) — Git Submodule
├── .gitignore
├── LICENSE           # Exclusive Copyright License
└── README.md
```

---

## 📥 Cloning This Repository

This repository uses **Git submodules** for `sesi8`, `sesi10`, and `sesi11`, each linked to its own repository:

- [belajar-bareng-automation](https://github.com/Ghifariezra/belajar-bareng-automation) → `sesi8`
- [sauce-demo-automation](https://github.com/Ghifariezra/sauce-demo-automation) → `sesi10`
- [appium-mobile-test-automation](https://github.com/Ghifariezra/appium-mobile-test-automation) → `sesi11`

Clone with submodules included:

```bash
git clone --recurse-submodules https://github.com/Ghifariezra/qa-mini-bootcamp-digtal-skola.git
```

Already cloned without submodules? Pull them in with:

```bash
git submodule update --init --recursive
```

---

## 📂 Navigation & Directory Links

| Directory / Session | Description & Deliverables | Direct Link |
| :--- | :--- | :--- |
| **QA Documentation** | Test Plans, Test Cases, and Bug Reports | [Go to Documentation](./docs) |
| **Session 3** | Programming Fundamental Practice | [Go to Session 3](./sesi3) |
| **Session 4** | Advanced Programming & Logic Practice | [Go to Session 4](./sesi4) |
| **Session 5** | Git Version Control & Manual API Testing | [Go to Session 5](./sesi5) |
| **Session 6** | 🎯 API Automation Testing Suite (Mocha, Chai, Ajv) | [Go to Session 6](./sesi6) |
| **Session 7** | Automation & Performance Testing | [Go to Session 7](./sesi7) |
| **Session 8** | 🌐 Web UI E2E Automation (Selenium WebDriver, Page Object Model) — *submodule, own repo* | [Go to Session 8](https://github.com/Ghifariezra/belajar-bareng-automation.git) |
| **Session 10** | 🌐 Web UI E2E Automation v2 — SauceDemo Login + Visual Regression (Selenium WebDriver, POM, cross-browser, canvas+pixelmatch) — *submodule, own repo* | [Go to Session 10](https://github.com/Ghifariezra/sauce-demo-automation.git) |
| **Session 11** | 📱 Mobile E2E Automation — Belajar Bareng & SauceLabs My Demo App (Appium, WebdriverIO, Mocha, Allure) — *submodule, own repo* | [Go to Session 11](https://github.com/Ghifariezra/appium-mobile-test-automation.git) |

---

## 🎯 Target & Competency Focus

* **ISTQB® Foundation Level Standard:** Implementation of Static Testing principles, Boundary Value Analysis (BVA), Equivalence Partitioning (EP), and Bug Lifecycle Management.
* **Automation Engineering:** Development of modular, maintainable End-to-End Test Automation scripts ready for CI/CD pipeline integration.

---

## 🔒 License & Copyright Statement

© 2026 Ghifari Ezra Ramadhan. All Rights Reserved.

This repository is created exclusively for personal software testing portfolio demonstration and recruiter evaluation. All source code, test scripts, documentation, test plans, test cases, and bug reports within this repository are protected under the [Exclusive Copyright License](./LICENSE). 

Unauthorized copying, reproduction, re-distribution, or commercial usage of any portion of this repository is strictly prohibited.