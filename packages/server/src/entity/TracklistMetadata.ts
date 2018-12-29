import { Tracklist } from "./Tracklist";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("sample3_tracklist_metadata")
export class TracklistMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Tracklist, tracklist => tracklist.metadata)
  tracks: Tracklist[];
}
