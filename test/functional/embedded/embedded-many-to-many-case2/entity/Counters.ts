import { Column } from "typeorm/decorator/columns/Column"
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany"
import { Subcounters } from "./Subcounters"
import { User } from "./User"

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

    @ManyToMany((type) => User, (user) => user.likedPosts)
    likedUsers: User[]
}
