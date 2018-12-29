import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sample3_tracklist_category")
export class TracklistCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
