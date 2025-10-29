export type Training = {
  id: string;
  title: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  objectives: string[];
  participantIds: string[];
};

export type Participant = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: '受講予定' | '受講中' | '修了';
  joinedAt: string;
  notes: string;
  trainingIds: string[];
};

export const trainings: Training[] = [
  {
    id: 'web-foundations-2024',
    title: 'Web開発基礎ブートキャンプ',
    category: 'フロントエンド',
    description: 'HTML/CSS/JavaScriptの基礎からコンポーネント志向開発までを集中的に学ぶ研修です。',
    startDate: '2024-04-08',
    endDate: '2024-04-12',
    location: '東京第1研修室',
    instructor: '佐藤花子',
    objectives: [
      'モダンなフロントエンド開発の基礎を理解する',
      'Vue.jsのコンポーネント設計を体得する',
      '少人数チームでのWebアプリ開発演習を行う'
    ],
    participantIds: ['yamada', 'suzuki', 'kato']
  },
  {
    id: 'nuxt-advanced-2024',
    title: 'Nuxt.js実践アーキテクチャ',
    category: 'バックエンド',
    description: 'Nuxt3を活用したサーバサイドレンダリングとAPI構築のベストプラクティスを学びます。',
    startDate: '2024-05-20',
    endDate: '2024-05-24',
    location: 'オンライン',
    instructor: '高橋良平',
    objectives: [
      'Nuxt3の新機能とアーキテクチャを理解する',
      'Nitroサーバーを使ったAPI開発を体験する',
      'モノレポ構成でのプロジェクト運用を学ぶ'
    ],
    participantIds: ['tanaka', 'suzuki']
  },
  {
    id: 'cloud-devops-bootcamp',
    title: 'クラウドDevOps集中講座',
    category: 'クラウド',
    description: 'CI/CDパイプライン構築から監視運用までをクラウド環境で体験するハンズオン研修です。',
    startDate: '2024-06-10',
    endDate: '2024-06-14',
    location: '大阪第3研修室',
    instructor: '王暁明',
    objectives: [
      'インフラ自動化ツールの基礎を学ぶ',
      'GitHub Actionsを用いたCI/CD構築',
      '可観測性向上のためのメトリクス・ログ設計'
    ],
    participantIds: ['yamada', 'tanaka']
  }
];

export const participants: Participant[] = [
  {
    id: 'yamada',
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    department: '技術本部 開発1課',
    role: 'フロントエンドエンジニア',
    status: '受講中',
    joinedAt: '2023-04-01',
    notes: 'Vue3移行プロジェクトのリード候補。',
    trainingIds: ['web-foundations-2024', 'cloud-devops-bootcamp']
  },
  {
    id: 'suzuki',
    name: '鈴木 花子',
    email: 'hanako.suzuki@example.com',
    department: 'DX推進部',
    role: 'UI/UXデザイナー',
    status: '受講予定',
    joinedAt: '2022-11-15',
    notes: 'アクセシビリティ改善プロジェクトを担当。',
    trainingIds: ['web-foundations-2024', 'nuxt-advanced-2024']
  },
  {
    id: 'tanaka',
    name: '田中 健',
    email: 'ken.tanaka@example.com',
    department: 'IT基盤部',
    role: 'SREエンジニア',
    status: '受講予定',
    joinedAt: '2021-08-23',
    notes: '社内向け監視基盤刷新プロジェクトのPM。',
    trainingIds: ['nuxt-advanced-2024', 'cloud-devops-bootcamp']
  },
  {
    id: 'kato',
    name: '加藤 由紀',
    email: 'yuki.kato@example.com',
    department: '人材開発室',
    role: '研修コーディネーター',
    status: '修了',
    joinedAt: '2020-02-10',
    notes: '新人研修の企画運営を担当。',
    trainingIds: ['web-foundations-2024']
  }
];
