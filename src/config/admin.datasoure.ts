import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";
import { Match } from "../entity/Match";
import { UserPreference } from "../entity/UserPreference";
import { Conversation } from "../entity/Conversation";
import { Message } from "../entity/Messages";

export const AdminDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  synchronize: true, 

  logging: false,

  entities: [User, UserProfile, Match, UserPreference,Conversation,  Message
],

  migrations: [],
  subscribers: [],
});
