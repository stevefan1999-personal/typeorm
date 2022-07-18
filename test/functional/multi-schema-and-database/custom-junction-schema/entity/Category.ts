import { Entity } from "typeorm/decorator/entity/Entity"
import { Column } from "typeorm/decorator/columns/Column"
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"

@Entity({
    schema: "yoman",
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
