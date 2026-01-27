// models/UserProfile.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserProfile = sequelize.define(
  "user_profile",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    height_cm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    marital_status: {
      type: DataTypes.ENUM(
        "Single",
        "Divorced",
        "Widowed",
        "Separated"
      ),
      allowNull: false,
    },

    marriage_priority: {
      type: DataTypes.ENUM("Soon", "Take Time", "Long"),
      allowNull: false,
    },

    religion: {
      type: DataTypes.ENUM(
        "Hindu",
        "Muslim",
        "Christian",
        "Sikh",
        "Other"
      ),
      allowNull: false,
    },

    born_religion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    faith_level: {
      type: DataTypes.ENUM(
        "Low",
        "Medium",
        "High"
      ),
      allowNull: false,
    },

    religious_commitment: {
      type: DataTypes.ENUM(
        "Not Practicing",
        "Occasional",
        "Regular",
        "Very Devoted"
      ),
      allowNull: false,
    },

    community: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ethnicity: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    eat_halal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    smoke: {
      type: DataTypes.ENUM("No", "Occasionally", "Yes"),
      allowNull: false,
    },

    drink: {
      type: DataTypes.ENUM("No", "Occasionally", "Yes"),
      allowNull: false,
    },

    has_children: {
      type: DataTypes.ENUM("No", "Yes", "Prefer Not Say"),
      allowNull: false,
    },

    move_abroad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    education_level: {
      type: DataTypes.ENUM(
        "High School",
        "Bachelor",
        "Master",
        "Doctorate",
        "Other"
      ),
      allowNull: false,
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birth_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    personality_tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    interests: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    tableName: "user_profile",
    timestamps: true,
    underscored: true,
  }
);

export default UserProfile;
