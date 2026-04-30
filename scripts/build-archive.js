const fs = require('fs');
const path = require('path');

// アーカイブ一覧ページを生成
function buildArchiveIndex() {
    const archiveDir = './archive';
    
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
    }
    
    // アーカイブファイル一覧を取得
    const files = fs.readdirSync(archiveDir)
        .filter(f => f.endsWith('.html') && f !== 'index.html')
        .sort()
        .reverse();
    
    const html = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>中国・台湾有事レポート アーカイブ</title>
    <style>
        body {
            font-family: 'Yu Gothic', sans-serif;
            background: #0a0e27;
            color: #e8eaf6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #ffa726;
            border-bottom: 3px solid #ffa726;
            padding-bottom: 1rem;
        }
        .archive-list {
            list-style: none;
            padding: 0;
        }
        .archive-item {
            background: #1a1f3a;
            margin: 1rem 0;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #1a5490;
        }
        .archive-item:hover {
            border-left-color: #ffa726;
            background: #2a2f4a;
        }
        .archive-link {
            color: #90caf9;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .archive-link:hover {
            color: #ffa726;
        }
        .back-link {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: #1a5490;
            color: white;
            text-decoration: none;
            border-radius: 8px;
        }
        .back-link:hover {
            background: #ffa726;
        }
    </style>
</head>
<body>
    <h1>📚 中国・台湾有事レポート アーカイブ</h1>
    <p>過去に公開されたレポートの一覧です。日付をクリックして各バージョンを確認できます。</p>
    
    <ul class="archive-list">
${files.map(f => {
    const date = f.replace('.html', '');
    return `        <li class="archive-item">
            <a href="${f}" class="archive-link">📅 ${date}</a>
        </li>`;
}).join('\n')}
    </ul>
    
    <a href="../index.html" class="back-link">← 最新版に戻る</a>
    
    <p style="margin-top: 2rem; opacity: 0.7; font-size: 0.9rem;">
        合計 ${files.length} 件のアーカイブ
    </p>
</body>
</html>`;
    
    fs.writeFileSync(path.join(archiveDir, 'index.html'), html);
    console.log(`アーカイブ一覧を生成しました (${files.length}件)`);
}

buildArchiveIndex();
