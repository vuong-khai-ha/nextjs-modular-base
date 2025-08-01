# ⚡ Next.js Bun-Based Modular App

A **feature-based monorepo-style fullstack application** powered by [Next.js App Router](https://nextjs.org/docs/app), [Bun](https://bun.sh/), and containerized with Docker. Designed for performance, modularity, and developer experience.

## 💡 About This Project
This is a public source base designed to help developers kickstart their Next.js projects with a solid and scalable foundation.

The goal is to create the best possible base structure, assisting developers in building clean, maintainable, and production-ready applications more easily.

> ⚠️ This is a source base with opinionated architecture and **basic authentication (login/logout)** built-in. \
**It is _not_ a real-world or sample business app.** \
You are expected to implement and complete your features based on this foundation.

It adopts a Modular Feature-Based Architecture, which brings several key benefits:

✅ **The Purpose**
- **Separation of Concerns:** Each feature is isolated and self-contained, making the codebase easier to navigate and reason about.
- **Scalability:** Well-suited for large projects and growing teams, as it encourages modularity and minimizes tight coupling between features.
- **Code Reusability:** Shared components, hooks, and utilities are placed in appropriate shared directories for maximum reuse.
- **Maintainability:** Changes in one feature rarely affect others, reducing regression bugs and making updates safer.
- **Team Collaboration Friendly:** With features organized clearly, multiple developers can work in parallel without conflicts.
- **Consistent Project Structure:** Provides a standardized directory layout, making onboarding faster and project understanding smoother.

This project aims to be a helpful resource for building modern, robust, and maintainable Next.js applications — whether you're building a startup MVP, an internal tool, or an open-source product.

---

## 🚀 Tech Stack

| Layer            | Technology                                          |
|------------------|-----------------------------------------------------|
| Runtime          | [Bun](https://bun.sh/)                              |
| Frontend         | [Next.js (App Router)](https://nextjs.org/docs/app) |
| Styling          | [Tailwind CSS](https://tailwindcss.com)             |
| UI Components    | [shadcn/ui](https://ui.shadcn.com/)                 |
| ORM              | [Drizzle ORM](https://orm.drizzle.team/)            |
| Database         | PostgreSQL                                          |
| Auth             | JWT + HttpOnly Cookies                              |
| Background Tasks | node-cron (isolated container)                      |
| Containerization | Docker + Docker Compose                             |

---

## 🌍 Environment Variables

- Create a `.env` file in the root if you don't use Docker
- Create a `.env` file in the `docker/*your_environment*/.env` if you use Docker

---

## 📦 Scripts
### Without Docker

| Command                          | Description                      |
|----------------------------------|----------------------------------|
| `bun run dev`                    | Run app in development mode      |
| `bun run build`                  | Build app for production         |
| `bun run start`                  | Start production server          |
| `bun run seed`                   | Insert dummy data                |
| `bun run ./src/cronjobs/index.ts` | Run cron jobs (separate)        |

---

### With Docker

#### Development

```bash
make start-dev
```

- Uses `bun x next dev` for hot reload
- Syncs code via volumes

#### Production

Build container:
```bash
make build-production
```

Start server:
```bash
make start-production
```

- `nextjs-modular-base-prod`: runs the main web app
- `nextjs-modular-base-prod-cron`: runs background cronjobs
---

## ❤️ Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## ☕ Support

If you find this project helpful, consider [sponsoring me](FUNDING.yml) to support development.

---

## 📄 License

[MIT](LICENSE)
