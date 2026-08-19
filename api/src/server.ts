import "dotenv/config";

import app from "./app";

import {
  connectToDatabase
} from "./config/database";

const port = Number(
  process.env.PORT ?? 3000
);

const mongoUri =
  process.env.MONGODB_URI ?? '';

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is required"
  );
}

async function startServer(): Promise<void> {

  await connectToDatabase(
    mongoUri
  );

  app.listen(
    port,
    () => {
      console.log(
        `API listening on port ${port}`
      );
    }
  );
}

startServer().catch(
  (error: unknown) => {

    console.error(
      "Failed to start server",
      error
    );

    process.exit(1);
  }
);