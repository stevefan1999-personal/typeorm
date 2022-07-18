import { ChildEntity, Column } from "typeorm"

import { Person } from "./Person"

@ChildEntity()
export class Employee extends Person {
    @Column()
    salary: number
}
