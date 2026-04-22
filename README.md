# 中国・台湾有事レポート 2026

**プロジェクト完全ドキュメント**

**GitHub Pages × Note 自動掲載システム 構築記録**

作成日:2026年4月22日  
作成者:としひで

---

## 目次

- 第1章 プロジェクト概要
- 第2章 制作したコンテンツ
- 第3章 システム構成とファイル一覧
- 第4章 構築手順(ステップバイステップ)
- 第5章 日常的な更新・運用方法
- 第6章 トラブルシューティング記録
- 第7章 今後の拡張アイデア

---

## 第1章 プロジェクト概要

### 1-1 プロジェクトの目的

2026年の東アジア最大の安全保障課題である「中国・台湾有事」を、一般視聴者向けにわかりやすく解説するYouTube動画と連動したデジタルコンテンツを制作・運用するシステムを構築した。

単なる動画制作にとどまらず、以下の3つを一体化した情報発信プラットフォームとして設計した。

- **YouTube動画**: 25〜30分の解説動画(台本あり)
- **インタラクティブWebレポート**: GitHub Pagesで常時公開
- **Note記事**: 半自動で下書き生成→貼り付けて公開

### 1-2 完成したシステムの全体像

| フロー | 内容 | 自動/手動 |
|:------|:-----|:---------|
| ① コンテンツ更新 | index.htmlを編集・保存 | 手動 |
| ② GitHub Desktop | コミット＆プッシュ | 手動(30秒) |
| ③ GitHub Actions | 自動デプロイ開始 | 全自動 |
| ④ GitHub Pages | Webレポートが自動更新 | 全自動 |
| ⑤ アーカイブ生成 | 日付別HTMLを自動保存 | 全自動 |
| ⑥ Note下書き生成 | note-draft.txtを自動生成 | 全自動 |
| ⑦ Note投稿 | テキストをコピペして公開 | 手動(2分) |

### 1-3 使用した技術・サービス

| サービス/技術 | 用途 | 費用 |
|:------------|:-----|:-----|
| Claude(Anthropic) | 台本・HTML・スクリプト生成 | 有料プラン |
| GitHub Desktop | ファイルのバージョン管理・アップロード | 無料 |
| GitHub Pages | HTMLレポートの無料Webホスティング | 無料 |
| GitHub Actions | デプロイ・アーカイブ生成の自動化 | 無料 |
| Note | 記事の公開・読者への情報発信 | 無料 |
| Node.js | スクリプト実行環境 | 無料 |

---

## 第2章 制作したコンテンツ

### 2-1 コンテンツの内容

今回制作したレポートは、2026年の中国・台湾情勢を以下の4つの視点から多角的に分析している。

- **戦況シミュレーション**: CSISの2026年台湾有事ウォーゲーム分析(24シナリオ)
- **タイムライン**: 2023年〜2026年の主要出来事と軍事演習
- **兵器解説**: 中国側(DF-21D・DF-26・055型駆逐艦・J-20)、台湾・米軍側(F-16V・HIMARS・ハープーン・PAC-3)
- **経済影響分析**: 半導体サプライチェーン・TSMC・日本経済への影響

### 2-2 情報源(シンクタンク・メディア)

| 機関名 | 分析内容 |
|:------|:--------|
| CSIS(米戦略国際問題研究所) | 台湾有事ウォーゲーム「The First Battle of the Next War」 |
| 防衛省防衛研究所(NIDS) | 中国のASBM開発動向・台湾海峡情勢分析 |
| 日本国際問題研究所(JIIA) | 東アジア安全保障・日米台関係分析 |
| 地経学研究所 | 台湾有事の経済的影響・サプライチェーン分析 |
| JETRO | 半導体産業・台湾企業の海外展開動向 |
| 日本台湾交流協会 | 台湾半導体産業調査報告書 |
| 日本経済新聞・Bloomberg・CNN | 各種最新報道 |

### 2-3 動画構成(台本)

| セクション | 内容 | 目安時間 |
|:---------|:-----|:---------|
| オープニング | タイトルカード・概要説明 | 1〜2分 |
| 第1部:背景編 | なぜ今、台湾なのか?2026年の緊張 | 5〜7分 |
| 第2部:シミュレーション編 | CSISウォーゲーム24シナリオの全貌 | 7〜8分 |
| 第3部:兵器編 | 中国vs台湾・米軍の最新鋭兵器 | 7〜8分 |
| 第4部:経済編 | 半導体ショック・日本への影響 | 5〜7分 |
| クロージング | まとめ・今後の展望 | 1〜2分 |
| **合計** | | **約26〜32分** |

---

## 第3章 システム構成とファイル一覧

### 3-1 リポジトリのファイル構成

```
リポジトリ名(例): taiwan-contingency-report

├── index.html                  ← 統合レポート本体(台本+全ビジュアル)
├── README.md                   ← セットアップガイド
├── archive/                    ← 日付別アーカイブフォルダ(自動生成)
│   ├── index.html              ← アーカイブ一覧ページ(自動生成)
│   ├── 2026-04-22.html         ← 4月22日版(自動生成)
│   └── 2026-04-23.html         ← 4月23日版(自動生成)
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions設定
└── scripts/
    ├── post-to-note.js         ← Note下書き生成スクリプト
    ├── build-archive.js        ← アーカイブ一覧生成スクリプト
    └── package.json
```

### 3-2 各ファイルの役割

| ファイル | 役割 | 編集頻度 |
|:--------|:-----|:---------|
| index.html | レポート本体。台本・タイムライン・シミュレーション・兵器解説・経済グラフを統合 | 毎回更新 |
| deploy.yml | GitHub Actionsの自動化設定。デプロイ・アーカイブ・Note下書き生成を制御 | 基本触らない |
| post-to-note.js | Noteへの下書きテキストを自動生成する | 基本触らない |
| build-archive.js | アーカイブ一覧ページ(archive/index.html)を自動生成する | 基本触らない |
| archive/*.html | 過去のレポートを日付別に自動保存したもの | 自動生成 |

### 3-3 GitHub Secrets(設定済み)

| Secret名 | 内容 |
|:--------|:-----|
| NOTE_SESSION_TOKEN | NoteのCookieから取得したセッショントークン(_note_session_v5) |
| NOTE_USER_ID | NoteのユーザーID |
| PAGES_URL | GitHub PagesのURL(例:https://username.github.io/taiwan-contingency-report) |

💡 **NOTE_SESSION_TOKENは定期的に失効します。ログインできなくなったら再取得してSecretを更新してください。**

---

## 第4章 構築手順(ステップバイステップ)

本プロジェクトを一から再現する場合の手順を記録する。

### STEP 1: GitHubアカウントにサインイン

GitHub Desktopを開き「Sign in to GitHub.com」をクリック。ブラウザでGitHubにログインして「Authorize desktop」をクリック。

### STEP 2: 新しいリポジトリを作成

- GitHub Desktop → File → New repository
- Name: 任意(例:taiwan-contingency-report)
- **Public(公開)に設定** ← GitHub Pages無料利用に必須
- 「Create repository」をクリック

### STEP 3: ファイルをリポジトリフォルダに配置

- GitHub Desktop → Repository → Show in Explorer でフォルダを開く
- index.html・README.md・.github/workflows/deploy.yml・scripts/ を配置
- .github と scripts フォルダは手動で作成する必要がある

### STEP 4: コミット＆プッシュ

- GitHub Desktopの左下「Summary」に「初回:中国台湾有事レポート2026」と入力
- 「Commit to main」をクリック
- 「Publish repository」または「Push origin」をクリック

### STEP 5: GitHub Pagesを有効化

- GitHubリポジトリ → Settings → Pages
- Source を「GitHub Actions」に変更
- 「Static HTML」の「Configure」をクリック
- 「Commit changes」をクリック

### STEP 6: GitHub Secretsを設定

- リポジトリ → Settings → Secrets and variables → Actions
- 「New repository secret」で以下の3つを登録
  - NOTE_SESSION_TOKEN: NoteのCookieから取得(_note_session_v5の値)
  - NOTE_USER_ID: NoteのユーザーID
  - PAGES_URL: GitHub PagesのURL

💡 **NOTE_SESSION_TOKENの取得方法**: Chrome → note.comにログイン → F12 → Application → Cookies → https://note.com → _note_session_v5のValueをコピー

### STEP 7: 動作確認

- index.htmlを少し編集して保存
- GitHub Desktop でコミット＆プッシュ
- GitHub ActionsタブでDeployが緑になることを確認
- GitHub PagesのURLでレポートが表示されることを確認
- ActionsのArtifactsからnote-draft.zipをダウンロードして下書きを確認

---

## 第5章 日常的な更新・運用方法

### 5-1 レポートを更新してNoteに投稿する手順

| 手順 | 操作 | 所要時間 |
|:----|:-----|:---------|
| ① | index.htmlをメモ帳・VSCodeなどで編集・保存 | 10〜30分 |
| ② | GitHub Desktop → Summaryに更新内容を入力 | 30秒 |
| ③ | 「Commit to main」をクリック | 10秒 |
| ④ | 「Push origin」をクリック | 10秒 |
| ⑤ | GitHub Actions → 2〜3分待って緑になるのを確認 | 3分 |
| ⑥ | ArtifactsからNOTE-DRAFTをダウンロード・解凍 | 1分 |
| ⑦ | note-draft.txtをメモ帳で開いてコピー | 30秒 |
| ⑧ | Noteの編集画面に貼り付けて公開 | 1〜2分 |

### 5-2 過去のレポートを見る方法

- GitHub Pages URL/archive/ にアクセス → 日付一覧が表示される
- 例:https://username.github.io/taiwan-contingency-report/archive/
- 各日付をクリックするとその日のレポートが開く
- gitのコミット履歴からも過去の状態を確認できる

### 5-3 NOTE_SESSION_TOKENが失効した場合

- Chromeでnote.comにログイン
- F12 → Application → Cookies → https://note.com
- _note_session_v5のValueをコピー
- GitHub → Settings → Secrets → NOTE_SESSION_TOKEN を更新

---

## 第6章 トラブルシューティング記録

構築時に発生する可能性のある問題と解決策を記録する。

| エラー | 原因 | 解決策 |
|:------|:-----|:-------|
| Repository creation failed(name already exists) | 同名リポジトリが既に存在 | リポジトリ名を変更(例:taiwan-contingency-report-2026) |
| 404 File not found(GitHub Pages) | index.htmlがリポジトリに未配置 | ファイルを配置してプッシュ |
| Note API 404 Not Found | APIエンドポイントが/v2→/v1に変更 | noteApiBaseを/api/v1に修正 |
| Note API not_login | CookieのKey名が間違い | note_gw_session→_note_session_v5に修正 |
| Note API 422 Unprocessable Entity | NoteのAPIが非公開のため形式不明 | 半自動方式(note-draft.txt生成)に切り替え |
| Invalid workflow file(YAML構文エラー) | deploy.ymlの記述が正しくない | ファイルを丸ごと書き換え |
| Cancelled(Actions) | 前のワークフローと重複 | しばらく待ってから手動でRun workflowを実行 |

💡 **NoteへのAPI自動投稿はNoteが非公開APIのため完全自動化は困難。現在は半自動(note-draft.txt生成→コピペ)で運用。**

---

## 第7章 今後の拡張アイデア

### 7-1 コンテンツの拡充

- **ウクライナ戦争レポート**など他の紛争にも同じシステムを適用
- **ISWの最新レポート**を毎日取得して自動でindex.htmlに反映する
- **経済指標**(日経平均・半導体株価)をAPIで自動取得してグラフに反映
- **YouTube動画のサムネイル画像**を自動生成
- **台湾海峡の軍事演習データ**をリアルタイム更新

### 7-2 システムの改善

- NoteがAPIを公式公開した場合は完全自動投稿を実装
- 複数の記事シリーズに対応(第1回・第2回…)
- Googleアナリティクスを追加してPV数を把握
- OGP画像(SNSシェア用サムネ)を自動生成
- **インタラクティブ地図**で南西諸島・台湾海峡を可視化

### 7-3 情報収集の自動化

- **CSIS・IISS**の最新レポートをスクレイピングして要約
- **半導体株価・TSMC株価**の最新データをAPIで取得
- Google Alertsと連携して重要ニュースを自動収集
- **防衛省・統合幕僚監部**の発表を自動追跡

---

**以上**

**中国・台湾有事レポート2026 プロジェクト完全ドキュメント**  
作成日:2026年4月22日
