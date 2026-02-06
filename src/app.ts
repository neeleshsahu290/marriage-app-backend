import dns from "dns";
dns.setDefaultResultOrder("ipv4first");


import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { AdminDataSource } from "./config/admin.datasoure";
import ErrorResponse from "./utils/error-resonse-util";

const app = express();

app.use(cors());
app.use(express.json());


AdminDataSource.initialize()
  .then(() => console.log("✅ Supabase Postgres connected via TypeORM"))
  .catch((err) => console.error("❌ DB error:", err));

app.use("/api", routes);
app.use(ErrorResponse.defaultMethod);

export default app;
