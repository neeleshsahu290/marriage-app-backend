

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { AdminDataSource } from "./config/admin.datasoure.js";

const app = express();

app.use(cors());
app.use(express.json());


AdminDataSource.initialize()
  .then(() => console.log("✅ Supabase Postgres connected via TypeORM"))
  .catch((err) => console.error("❌ DB error:", err));

app.use("/api", routes);

export default app;
