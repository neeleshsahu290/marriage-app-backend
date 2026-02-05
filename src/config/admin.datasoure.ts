import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config'
import { UserProfile } from "../entity/UserProfile";
import { User } from "../entity/User";
import { Match } from "../entity/Match";
import { UserPreference } from "../entity/UserPreference";



export const AdminDataSource = new DataSource({
  type: "postgres",
  host: process.env.SUPABASE_DB_HOST,
  port: parseInt(process.env.SUPABASE_DB_PORT || "5432"),
  username: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: true,
  logging: false,

  entities: [User, UserProfile,Match,UserPreference],
  migrations: [],
  subscribers: [],
});
