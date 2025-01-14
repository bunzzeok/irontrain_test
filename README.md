# irontrain Coding Test

## 프로젝트 소개

### irontrain Coding Test 과제

Enviroment : vite3 + vue3 + typescript + node 16.16.0

### Directory

```
itrotrain_coding_test/
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── api
│   │   │   └── faker.ts
│   │   ├── css
│   │   │   └── reset.css
│   │   ├── imgs
│   │   │   └── searchButton.png
│   │   ├── tailwind
│   │   │   └── index.css
│   │   ├── ts
│   │       └── common.ts
│   ├── components
│   │   ├── AddressRow.vue
│   │   ├── Column.vue
│   │   └── Row.vue
│   ├── main.ts
│   ├── types
│   │   └── faker.ts
│   ├── utils
│   │   └── axios.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 설치 및 실행 방법

1. **Env 세팅**  
   프로젝트 루트에 .env.local 파일을 생성합니다.
   이후, 내부에 `VITE_SOME_KEY=fakerapi.it` 을 입력하고 저장합니다.

2. **의존성 설치 및 실행**  
   프로젝트 루트에서 다음처럼 실행하시면 됩니다.
   ```javascript
   // 실행을 위해 npm i 와 npm run dev 를 묶어 뒀습ㅅ차니다.
   npm run start
   ```
3. **확인**  
   기본 포트는 5173 입니다.  
   http://localhost:5173
