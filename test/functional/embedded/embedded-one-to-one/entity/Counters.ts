import { Column } from "typeorm/decorator/columns/Column"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { OneToOne } from "typeorm/decorator/relations/OneToOne"
import { User } from "./User"
import { Subcounters } from "./Subcounters"

export class Counters {
    @Column()
    code: number

    @Column()
    likes: number

    @Column()
    comments: number

    @Column()
    favorites: number

    @Column(() => Subcounters, { prefix: "subcnt" })
    subcounters: Subcounters

    @OneToOne(() => User, (user) => user.likedPost)
    @JoinColumn()
    likedUser: User
}
