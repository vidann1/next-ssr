import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tracklist } from "./Tracklist";
@Entity("sample3_tracklist_information")
export class TracklistInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  timestamp: string;

  @OneToMany(() => Tracklist, tracklist => tracklist.information, {
    cascade: ["update"]
  })
  tracks: Tracklist[];
}
