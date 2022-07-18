import { ChildEntity } from "../../typeorm/decorator/entity/ChildEntity"
import { Staff } from "./Staff"
import { Column } from "../../typeorm"

@ChildEntity("PROFESSOR")
export class Professor extends Staff {
    constructor(className: string) {
        super()
        this.className = className
    }

    @Column()
    className: string
}
