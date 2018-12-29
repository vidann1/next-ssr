import { Tracklist } from "./Tracklist";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("sample3_tracklist_details")
export class TracklistDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    nullable: true
  })
  authorName: string | null;

  @Column({
    type: String,
    nullable: true
  })
  comment: string | null;

  @Column({
    type: String,
    nullable: true
  })
  tracks: string | null;

  @Column({
    type: String,
    nullable: true
  })
  metadata: string | null;

  @OneToMany(() => Tracklist, tracklist => tracklist.details, {
    cascade: true
  })
  tracklists: Tracklist[];
}
