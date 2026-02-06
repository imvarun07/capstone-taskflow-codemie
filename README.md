# TODO App — Spring Boot + React + SQLite

シンプルな TODO アプリケーションです。

| レイヤー | 技術スタック |
| --- | --- |
| **バックエンド** | Java 17+, Spring Boot 3.4, Spring JDBC (`JdbcClient`), Flyway, SQLite |
| **フロントエンド** | React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui (new-york) |
| **データベース** | SQLite（ファイル DB: `backend/data/todo.db`） |

---

## 前提条件

- **JDK 17 以上**（21 でも OK）
- **Node.js 20 以上**
- **Maven 3.8+**（`backend/mvnw` ラッパーでも可）

---

## 起動方法

### 1. バックエンド（API サーバー — ポート 8080）

```bash
cd backend
./mvnw spring-boot:run
```

初回起動時に Flyway が `data/todo.db` を自動作成し、テーブルをマイグレーションします。

### 2. フロントエンド（開発サーバー — ポート 5173）

```bash
cd frontend
npm install   # 初回のみ
npm run dev
```

ブラウザで **http://localhost:5173** を開くと TODO アプリが表示されます。  
開発サーバーは `/api` へのリクエストを `http://localhost:8080` にプロキシします。

---

## API 仕様

| メソッド | パス | 説明 | リクエストボディ | レスポンス |
| --- | --- | --- | --- | --- |
| `GET` | `/api/todos` | 一覧取得 | — | `Todo[]` |
| `GET` | `/api/todos/{id}` | 1 件取得 | — | `Todo` |
| `POST` | `/api/todos` | 新規作成 | `{ "title": "..." }` | `Todo` (201) |
| `PATCH` | `/api/todos/{id}` | 部分更新 | `{ "title?": "...", "completed?": true }` | `Todo` |
| `DELETE` | `/api/todos/{id}` | 削除 | — | 204 No Content |

### Todo オブジェクト

```json
{
  "id": 1,
  "title": "Buy milk",
  "completed": false,
  "createdAt": "2026-01-01T10:00:00",
  "updatedAt": "2026-01-01T10:00:00"
}
```

---

## プロジェクト構成

```
todo-java/
├── backend/                  # Spring Boot アプリケーション
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd      # Maven Wrapper
│   └── src/
│       ├── main/
│       │   ├── java/com/example/todo/
│       │   │   ├── TodoApplication.java
│       │   │   ├── config/
│       │   │   ├── controller/
│       │   │   ├── domain/
│       │   │   ├── exception/
│       │   │   ├── repository/
│       │   │   └── service/
│       │   └── resources/
│       │       ├── application.yml
│       │       └── db/migration/
│       └── test/
├── frontend/                 # React アプリケーション
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── components/       # UI コンポーネント
│       ├── hooks/            # カスタムフック
│       ├── lib/              # API クライアント・ユーティリティ
│       └── main.tsx
└── README.md
```

---

## テスト

```bash
cd backend
./mvnw test
```

---

## ライセンス

MIT
