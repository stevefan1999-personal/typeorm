import { Entity } from "typeorm/decorator/entity/Entity"
import { Column } from "typeorm/decorator/columns/Column"
import { Counters } from "./Counters"
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn"

@Entity()
export class Post {
    @PrimaryColumn()
    id: number

    @Column()
    title: string

    @Column(() => Counters)
    counters: Counters
}
