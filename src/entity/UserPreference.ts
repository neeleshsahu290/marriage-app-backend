import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
 
} from "typeorm";

@Entity({ name: "user_preferences", synchronize: true })
export class UserPreference {

  // Primary key
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  // ----------------- Matching Preferences -----------------

  @Column({ type: "int" })
  min_age: number;

  @Column({ type: "int" })
  max_age: number;

  @Column({ type: "int" })
  max_distance_km: number;

  @Column({ nullable: true })
  min_education_level?: string;

  // ----------------- Meta -----------------

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
