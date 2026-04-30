# 中国・台湾有事レポート 2026

## 📋 概要

2026年の中国・台湾情勢を多角的に分析したインタラクティブWebレポート。
GitHub Pages + 自動更新システムで運用。

## 🚀 セットアップ手順

### 1. リポジトリ構成

```
china-tiwan2026/
├── index.html              # メインレポート
├── README.md              # このファイル
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions設定
├── scripts/
│   ├── package.json
│   ├── fetch-taiwan-news.js
│   ├── build-archive.js
│   └── post-to-note.js
└── archive/               # 自動生成されるアーカイブ
    ├── index.html
    ├── 2026-04-30.html
    └── ...
```

### 2. GitHub Pagesの有効化

1. GitHubリポジトリ → Settings → Pages
2. Source を「GitHub Actions」に変更
3. 「Static HTML」の「Configure」をクリック

### 3. GitHub Secretsの設定(オプション)

Note自動投稿を使う場合:

- `NOTE_SESSION_TOKEN`: Noteのセッショントークン
- `NOTE_USER_ID`: NoteのユーザーID
- `PAGES_URL`: GitHub PagesのURL

## ⚙️ 自動更新機能

### 24時間ごとの自動実行

GitHub Actionsが毎日午前9時(UTC)に以下を実行:

1. **ニュース取得ログ作成** (実際のニュース取得は手動推奨)
2. **アーカイブ生成** - 日付別にindex.htmlをコピー
3. **アーカイブ一覧更新** - archive/index.htmlを自動生成
4. **Note下書き生成** - note-draft.txtを作成
5. **GitHub Pagesデプロイ** - 自動公開

### 手動実行

GitHub → Actions → Deploy to GitHub Pages → Run workflow

## 📝 更新方法

### 通常の更新(手動)

1. `index.html`を編集
2. GitHub Desktop でコミット&プッシュ
3. GitHub Actionsが自動でデプロイ

### スケジュール変更

`.github/workflows/deploy.yml`の`cron`を編集:

```yaml
schedule:
  - cron: '0 9 * * *'  # 毎日9:00 UTC (日本時間18:00)
  # - cron: '0 */12 * * *'  # 12時間ごと
  # - cron: '0 0 * * 0'  # 毎週日曜日
```

## 📚 アーカイブ

過去のレポートは`archive/`フォルダに日付別で保存:

- URL: `https://[username].github.io/china-tiwan2026/archive/`
- 一覧: `https://[username].github.io/china-tiwan2026/archive/index.html`

## 🔗 Note連携

GitHub Actions実行後:

1. Actions → Deploy to GitHub Pages → Artifacts
2. `NOTE-DRAFT`をダウンロード
3. `note-draft.txt`をNoteにコピー&ペースト

## 🛠 トラブルシューティング

### GitHub Actionsが失敗する

- `.github/workflows/deploy.yml`が正しい位置にあるか確認
- `scripts/package.json`が存在するか確認

### アーカイブが生成されない

- `archive/`フォルダが自動生成されます
- 初回実行後に作成されます

### Note下書きが生成されない

- `PAGES_URL`シークレットが設定されているか確認
- Artifactsからダウンロードできます

## 📊 主要セクション

1. **概要** - レポート全体の説明
2. **タイムライン** - 2023-2026年の主要イベント
3. **CSISウォーゲーム** - 24シナリオ分析
4. **主要兵器** - 中国・台湾・米軍の兵器システム
5. **経済的影響** - TSMC・半導体・日本経済
6. **結論・情報源** - 総括と参考文献
7. **アーカイブ** - 過去バージョン

## 📞 サポート

質問や問題があれば、GitHubのIssuesで報告してください。

---

© 2026 ナナ | 中国・台湾有事レポート2026
