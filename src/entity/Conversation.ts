import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";

@Entity({ name: "conversations" , synchronize:true})
export class Conversation {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  match_id: string;


  @Column("uuid")
  user1_id: string;

  @Column("uuid")
  user2_id: string;

  @Column({ type: "text", nullable: true })
  last_message: string;

  @Column({ type: "timestamp", nullable: true })
  last_message_time: Date;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  started_at: Date;
}