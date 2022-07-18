import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    liked: boolean
}
