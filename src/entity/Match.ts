import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserProfile } from "./UserProfile";
import { User } from "./User";

export enum MatchStatus {
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
  PASS = "PASS",
  RECOMMENDED="RECOMMENDED"

}

@Entity({ name: "matches", synchronize:false })
export class Match {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  requester_id: string;

  @Column("uuid")
  receiver_id: string;

  @Column({
    type: "enum",
    enum: MatchStatus,
    default: MatchStatus.SENT,
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "requester_id", referencedColumnName: "id" })
  requesterUser!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiver_id", referencedColumnName: "id" })
  receiverUser!: User;

    //  requester profile
  @ManyToOne(() => UserProfile)
  @JoinColumn({ name: "requester_id", referencedColumnName: "user_id" })
  requesterProfile!: UserProfile;

  //  receiver profile
  @ManyToOne(() => UserProfile)
  @JoinColumn({ name: "receiver_id", referencedColumnName: "user_id" })
  receiverProfile!: UserProfile;
}
