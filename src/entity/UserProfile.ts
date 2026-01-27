import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_profile")
export class UserProfile {

  @PrimaryColumn("uuid")
  user_id: string;

  @Column({ type: "enum", enum: ["Male", "Female"] })
  gender: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column()
  last_name: string;

  @Column({ type: "date" })
  dob: string;

  @Column({ nullable: true })
  height_cm?: number;

  @Column({ type: "enum", enum: ["Single", "Divorced", "Widowed", "Separated"] })
  marital_status: string;

  @Column({ type: "enum", enum: ["Soon", "Take Time", "Long"] })
  marriage_priority: string;

  @Column()
  religion: string;

  @Column()
  born_religion: boolean;

  @Column()
  faith_level: string;

  @Column()
  religious_commitment: string;

  @Column({ nullable: true })
  community?: string;

  @Column({ nullable: true })
  ethnicity?: string;

  @Column()
  eat_halal: boolean;

  @Column()
  smoke: string;

  @Column()
  drink: string;

  @Column()
  has_children: string;

  @Column()
  move_abroad: boolean;

  @Column()
  profession: string;

  @Column()
  education_level: string;

  @Column()
  nationality: string;

  @Column()
  birth_country: string;

  @Column({ type: "jsonb", nullable: true })
  personality_tags: any;

  @Column({ type: "jsonb", nullable: true })
  interests: any;

  @Column({ length: 250, nullable: true })
  bio?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
