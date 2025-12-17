const trainings = [
  {
    id: "web-foundations-2024",
    title: "Web\u958B\u767A\u57FA\u790E\u30D6\u30FC\u30C8\u30AD\u30E3\u30F3\u30D7",
    category: "\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9",
    description: "HTML/CSS/JavaScript\u306E\u57FA\u790E\u304B\u3089\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u5FD7\u5411\u958B\u767A\u307E\u3067\u3092\u96C6\u4E2D\u7684\u306B\u5B66\u3076\u7814\u4FEE\u3067\u3059\u3002",
    startDate: "2024-04-08",
    endDate: "2024-04-12",
    location: "\u6771\u4EAC\u7B2C1\u7814\u4FEE\u5BA4",
    instructor: "\u4F50\u85E4\u82B1\u5B50",
    objectives: [
      "\u30E2\u30C0\u30F3\u306A\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u958B\u767A\u306E\u57FA\u790E\u3092\u7406\u89E3\u3059\u308B",
      "Vue.js\u306E\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u8A2D\u8A08\u3092\u4F53\u5F97\u3059\u308B",
      "\u5C11\u4EBA\u6570\u30C1\u30FC\u30E0\u3067\u306EWeb\u30A2\u30D7\u30EA\u958B\u767A\u6F14\u7FD2\u3092\u884C\u3046"
    ],
    participantIds: ["yamada", "suzuki", "kato"]
  },
  {
    id: "nuxt-advanced-2024",
    title: "Nuxt.js\u5B9F\u8DF5\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3",
    category: "\u30D0\u30C3\u30AF\u30A8\u30F3\u30C9",
    description: "Nuxt3\u3092\u6D3B\u7528\u3057\u305F\u30B5\u30FC\u30D0\u30B5\u30A4\u30C9\u30EC\u30F3\u30C0\u30EA\u30F3\u30B0\u3068API\u69CB\u7BC9\u306E\u30D9\u30B9\u30C8\u30D7\u30E9\u30AF\u30C6\u30A3\u30B9\u3092\u5B66\u3073\u307E\u3059\u3002",
    startDate: "2024-05-20",
    endDate: "2024-05-24",
    location: "\u30AA\u30F3\u30E9\u30A4\u30F3",
    instructor: "\u9AD8\u6A4B\u826F\u5E73",
    objectives: [
      "Nuxt3\u306E\u65B0\u6A5F\u80FD\u3068\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3\u3092\u7406\u89E3\u3059\u308B",
      "Nitro\u30B5\u30FC\u30D0\u30FC\u3092\u4F7F\u3063\u305FAPI\u958B\u767A\u3092\u4F53\u9A13\u3059\u308B",
      "\u30E2\u30CE\u30EC\u30DD\u69CB\u6210\u3067\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u904B\u7528\u3092\u5B66\u3076"
    ],
    participantIds: ["tanaka", "suzuki"]
  },
  {
    id: "cloud-devops-bootcamp",
    title: "\u30AF\u30E9\u30A6\u30C9DevOps\u96C6\u4E2D\u8B1B\u5EA7",
    category: "\u30AF\u30E9\u30A6\u30C9",
    description: "CI/CD\u30D1\u30A4\u30D7\u30E9\u30A4\u30F3\u69CB\u7BC9\u304B\u3089\u76E3\u8996\u904B\u7528\u307E\u3067\u3092\u30AF\u30E9\u30A6\u30C9\u74B0\u5883\u3067\u4F53\u9A13\u3059\u308B\u30CF\u30F3\u30BA\u30AA\u30F3\u7814\u4FEE\u3067\u3059\u3002",
    startDate: "2024-06-10",
    endDate: "2024-06-14",
    location: "\u5927\u962A\u7B2C3\u7814\u4FEE\u5BA4",
    instructor: "\u738B\u6681\u660E",
    objectives: [
      "\u30A4\u30F3\u30D5\u30E9\u81EA\u52D5\u5316\u30C4\u30FC\u30EB\u306E\u57FA\u790E\u3092\u5B66\u3076",
      "GitHub Actions\u3092\u7528\u3044\u305FCI/CD\u69CB\u7BC9",
      "\u53EF\u89B3\u6E2C\u6027\u5411\u4E0A\u306E\u305F\u3081\u306E\u30E1\u30C8\u30EA\u30AF\u30B9\u30FB\u30ED\u30B0\u8A2D\u8A08"
    ],
    participantIds: ["yamada", "tanaka"]
  }
];
const participants = [
  {
    id: "yamada",
    name: "\u5C71\u7530 \u592A\u90CE",
    email: "taro.yamada@example.com",
    department: "\u6280\u8853\u672C\u90E8 \u958B\u767A1\u8AB2",
    role: "\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u30A8\u30F3\u30B8\u30CB\u30A2",
    status: "\u53D7\u8B1B\u4E2D",
    joinedAt: "2023-04-01",
    notes: "Vue3\u79FB\u884C\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u30EA\u30FC\u30C9\u5019\u88DC\u3002",
    trainingIds: ["web-foundations-2024", "cloud-devops-bootcamp"]
  },
  {
    id: "suzuki",
    name: "\u9234\u6728 \u82B1\u5B50",
    email: "hanako.suzuki@example.com",
    department: "DX\u63A8\u9032\u90E8",
    role: "UI/UX\u30C7\u30B6\u30A4\u30CA\u30FC",
    status: "\u53D7\u8B1B\u4E88\u5B9A",
    joinedAt: "2022-11-15",
    notes: "\u30A2\u30AF\u30BB\u30B7\u30D3\u30EA\u30C6\u30A3\u6539\u5584\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u62C5\u5F53\u3002",
    trainingIds: ["web-foundations-2024", "nuxt-advanced-2024"]
  },
  {
    id: "tanaka",
    name: "\u7530\u4E2D \u5065",
    email: "ken.tanaka@example.com",
    department: "IT\u57FA\u76E4\u90E8",
    role: "SRE\u30A8\u30F3\u30B8\u30CB\u30A2",
    status: "\u53D7\u8B1B\u4E88\u5B9A",
    joinedAt: "2021-08-23",
    notes: "\u793E\u5185\u5411\u3051\u76E3\u8996\u57FA\u76E4\u5237\u65B0\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306EPM\u3002",
    trainingIds: ["nuxt-advanced-2024", "cloud-devops-bootcamp"]
  },
  {
    id: "kato",
    name: "\u52A0\u85E4 \u7531\u7D00",
    email: "yuki.kato@example.com",
    department: "\u4EBA\u6750\u958B\u767A\u5BA4",
    role: "\u7814\u4FEE\u30B3\u30FC\u30C7\u30A3\u30CD\u30FC\u30BF\u30FC",
    status: "\u4FEE\u4E86",
    joinedAt: "2020-02-10",
    notes: "\u65B0\u4EBA\u7814\u4FEE\u306E\u4F01\u753B\u904B\u55B6\u3092\u62C5\u5F53\u3002",
    trainingIds: ["web-foundations-2024"]
  }
];

export { participants, trainings };
//# sourceMappingURL=data.mjs.map
