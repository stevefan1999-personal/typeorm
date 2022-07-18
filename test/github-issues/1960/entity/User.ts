import { Column } from "typeorm"
import { PrimaryGeneratedColumn } from "typeorm"
import { Entity } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    public id: number

    @Column("varchar")
    public name: string

    @Column("time")
    public time: Date

    @Column("timestamp")
    public timestamp: Date

    @Column("datetime")
    public date1: Date

    @Column("datetime", { nullable: true })
    public date2: Date
}
