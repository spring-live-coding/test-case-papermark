const port = process.env.PORT || "3417";
const d = {
  NEXTAUTH_SECRET: "preview-placeholder-secret",
  NEXTAUTH_URL: `http://localhost:${port}`,
  NEXT_PUBLIC_BASE_URL: `http://localhost:${port}`,
  NEXT_PUBLIC_MARKETING_URL: `http://localhost:${port}`,
  NEXT_PUBLIC_APP_BASE_HOST: "localhost",
  NEXT_PUBLIC_WEBHOOK_BASE_HOST: "webhooks.localhost",
  NEXT_PUBLIC_WEBHOOK_BASE_URL: "http://webhooks.localhost",
  POSTGRES_PRISMA_URL: "postgresql://u:p@localhost:5432/db",
  POSTGRES_PRISMA_URL_NON_POOLING: "postgresql://u:p@localhost:5432/db",
  NEXT_PRIVATE_DOCUMENT_PASSWORD_KEY: "preview-doc-secret",
  NEXT_PRIVATE_VERIFICATION_SECRET: "preview-verif-secret",
  NEXT_PUBLIC_UPLOAD_TRANSPORT: "vercel",
};
for (const [k, v] of Object.entries(d)) if (!process.env[k]) process.env[k] = v;
const patch = new URL("./hostpatch.mjs", import.meta.url).href;
process.env.NODE_OPTIONS = ((process.env.NODE_OPTIONS || "") + " --import=" + patch).trim();
await import("./hostpatch.mjs");
process.argv = [process.argv[0], "next", "dev", "--port", port];
await import("next/dist/bin/next");
