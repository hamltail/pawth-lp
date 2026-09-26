# Pawth Landing Page

Pawth の紹介用ランディングページです。

## Live Demo

🌐 [Webサイトを見る](https://pawth-lp.hamltail.dev/)

## Tech Stack

| Category       | Technologies                                             |
| -------------- | -------------------------------------------------------- |
| Frontend       | Next.js, React, TypeScript, Tailwind CSS, next-intl      |
| Testing        | Vitest, Playwright, Stryker, axe-core, Lighthouse CI, k6 |
| Security       | OWASP ZAP, CodeQL                                        |
| Infrastructure | Docker, Vercel, GitHub Actions                           |

## Technical Decisions

当初は HTML・CSS・JavaScript による静的サイトとして制作していましたが、機能拡張や継続的な改善を行いやすくするため、Next.js へ移行しました。

アクセシビリティやE2Eテストなどを取り入れ、実装後も継続的に品質を確認・改善できる構成にしています。

## Docker

### Build

```bash
docker build -t pawth-lp .
```

### Start

```bash
docker run --rm --name pawth-lp -p 3000:3000 pawth-lp
```

### Check

```bash
docker ps
```

### Stop

```bash
docker stop pawth-lp
```

`--rm` を指定しているため、停止したコンテナは自動的に削除されます。

## License

このリポジトリはポートフォリオ目的で公開しています。

著作権は作者に帰属します。
無断転載・再配布・商用利用はご遠慮ください。

This repository is published for portfolio purposes only.

All rights to the content belong to the author.

Please do not reproduce, redistribute, or use any part of this project for commercial purposes without permission.

## Author

- h-waji (hamltail)
