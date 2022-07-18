import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ schema: "schema" })
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column("enum", { enum: ["A", "B", "C"] })
    enum: string

    @Column()
    name: string
}
