import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tracklist } from "./Tracklist";

@Entity("sample3_tracklist_author")
export class TracklistAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Tracklist, tracklist => tracklist.author)
  tracks: Tracklist[];
}
