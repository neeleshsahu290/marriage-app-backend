import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";
import { Match } from "../entity/Match";
import { UserPreference } from "../entity/UserPreference";

export const AdminDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  extra: {
    ssl: {
      rejectUnauthorized: false, // ✅ important for Supabase
    },
  },

  synchronize: false, // ⚠️ don't use true in prod (can break schema)

  logging: false,

  entities: [User, UserProfile, Match, UserPreference],

  migrations: [],
  subscribers: [],
});
