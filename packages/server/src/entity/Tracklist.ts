import { TracklistDetails } from "./TracklistDetails";
import { TracklistCategory } from "./TracklistCategory";
import { TracklistAuthor } from "./TracklistAuthor";
import { TracklistInformation } from "./TracklistInformation";
// import {TracklistImage} from "./TracklistImage";
import { TracklistMetadata } from "./TracklistMetadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("sample3_tracklist")
export class Tracklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  timestamp: string;

  // tracklist has relation with category, however inverse relation is not set (category does not have relation with tracklist set)
  @ManyToOne(() => TracklistCategory, {
    cascade: true
  })
  category: TracklistCategory;

  // post has relation with details. cascade inserts here means if new PostDetails instance will be set to this
  // relation it will be inserted automatically to the db when you save this Post entity
  @ManyToOne(() => TracklistDetails, details => details.tracks, {
    cascade: ["insert"]
  })
  details: TracklistDetails;

  // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
  // it will be inserted automatically to the db when you save this Post entity
  /*
	@ManyToOne(type => PostImage, image => image.posts, {
        cascade: ["update"]
    })
    image: PostImage;
	*/
  // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
  // it will be inserted automatically to the db when you save this Post entity
  @ManyToOne(() => TracklistMetadata, metadata => metadata.tracks)
  metadata: TracklistMetadata | null;

  // post has relation with details. full cascades here
  @ManyToOne(() => TracklistInformation, information => information.tracks, {
    cascade: true
  })
  information: TracklistInformation;

  // post has relation with details. not cascades here. means cannot be persisted, updated or removed
  @ManyToOne(() => TracklistAuthor, author => author.tracks)
  author: TracklistAuthor;
}

/*import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";

@Entity()
export class Tracklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  timestamp: string;

  @Column()
  category: string;

  @ManyToMany(() => User)
  @JoinTable({name:"trackl"})
  users: User[];
}
*/
