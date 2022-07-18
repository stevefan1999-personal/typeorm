import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { TestEntity2 } from "./TestEntity2"

@Entity()
export class TestEntity1 {
    @PrimaryGeneratedColumn()
    id: number

    @Column() name: string

    @OneToOne((t) => TestEntity2, (a) => a.Entity1)
    @JoinColumn()
    Entity2: TestEntity2
}
