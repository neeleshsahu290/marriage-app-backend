import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export enum Religion {
  ISLAM = "ISLAM",
  CHRISTIANITY = "CHRISTIANITY",
  HINDUISM = "HINDUISM",
  SIKHISM = "SIKHISM",
  BUDDHISM = "BUDDHISM",
  JAINISM = "JAINISM",
  JUDAISM = "JUDAISM",
  BAHAI = "BAHAI",
  ZOROASTRIANISM = "ZOROASTRIANISM",
  OTHER = "OTHER",
}

export enum ReligiousFaith {
  STRICT = "STRICT",
  MODERATE = "MODERATE",
  FLEXIBLE = "FLEXIBLE",
}

export enum MaritalStatus {
  NEVER_MARRIED = "NEVER_MARRIED",
  SEPARATED = "SEPARATED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}


export enum FamilyType {
  NUCLEAR = "NUCLEAR",
  JOINT = "JOINT",
  EXTENDED = "EXTENDED",
}


export enum ParentsStatus {
  LIVING_TOGETHER = "LIVING_TOGETHER",
  SEPARATED = "SEPARATED",
  FATHER_PASSED = "FATHER_PASSED",
  BOTH_PASSED = "BOTH_PASSED",
}

export enum EducationLevel {
  SECONDARY = "SECONDARY",
  HIGH_SCHOOL = "HIGH_SCHOOL",
  NON_DEGREE = "NON_DEGREE",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE",
  OTHER = "OTHER",
}

export enum Profession {
  IT = "IT",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  BUSINESS = "BUSINESS",
  FINANCE = "FINANCE",
  GOVERNMENT = "GOVERNMENT",
  LEGAL = "LEGAL",
  ENGINEERING = "ENGINEERING",
  SALES = "SALES",
  DESIGN = "DESIGN",
  MEDIA = "MEDIA",
  ARCHITECTURE = "ARCHITECTURE",
  MANUFACTURING = "MANUFACTURING",
  HOSPITALITY = "HOSPITALITY",
  AVIATION = "AVIATION",
  AGRICULTURE = "AGRICULTURE",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  HOMEMAKER = "HOMEMAKER",
  STUDENT = "STUDENT",
  RETIRED = "RETIRED",
  OTHER = "OTHER",
}
export enum MarriagePriority {
  WITHIN_6_MONTHS = "WITHIN_6_MONTHS",
  SIX_TO_TWELVE_MONTHS = "SIX_TO_TWELVE_MONTHS",
  ONE_TO_TWO_YEARS = "ONE_TO_TWO_YEARS",
  TWO_PLUS_YEARS = "TWO_PLUS_YEARS",
}


@Entity({ name: "user_profile", synchronize: true })
export class UserProfile {
  @PrimaryColumn("uuid")
  user_id: string;

  @Column()
  full_name: string;

  @Column({ type: "date" })
  dob: string;

  @Column({ type: "enum", enum: Gender })
  gender: string;

@Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
height_cm?: number;

  @Column({
    type: "enum",
    enum: Religion,
  })
  religion: string;

@Column({
  type: "enum",
  enum: ReligiousFaith,
  nullable: true,
})
religious_faith?: ReligiousFaith | null;


  @Column({ type: "jsonb", nullable: true })
  languages_known?: any;

  @Column({ length: 500, nullable: true })
  bio?: string;

  @Column({
    type: "enum",
    enum: MaritalStatus,
  })
  marital_status: string;

  @Column()
  has_children: boolean;

  @Column({
    type: "enum",
    enum: FamilyType,
  })
  family_type: string;

  @Column({
  type: "enum",
  enum: ParentsStatus,
  nullable: true,
})
parents_status: ParentsStatus | null;

  @Column({
    type: "enum",
    enum: EducationLevel,
  })
  education_level: string;

  @Column({
    type: "enum",
    enum: Profession,
  })
  profession: string;

  @Column({ type: "jsonb", nullable: true })
  personality_traits?: any;

  @Column({ type: "jsonb", nullable: true })
  hobbies?: any;

  @Column({ type: "jsonb", nullable: true })
  profile_photos?: any;

  @Column({ type: "jsonb", nullable: true })
  habits?: any;

  @Column({
    type: "enum",
    enum: MarriagePriority,
  })
  marriage_priority: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;


}
