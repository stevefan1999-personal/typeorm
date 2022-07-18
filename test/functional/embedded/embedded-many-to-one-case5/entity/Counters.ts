import { Column } from "typeorm/decorator/columns/Column"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne"
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn"
import { User } from "./User"
import { Subcounters } from "./Subcounters"

export class Counters {
    @PrimaryColumn()
    code: number

    @Column()
    likes: number

    @Column()
    comments: number

    @Column()
    favorites: number

    @Column(() => Subcounters, { prefix: "subcnt" })
    subcounters: Subcounters

    @ManyToOne((type) => User)
    @JoinColumn()
    likedUser: User
}
