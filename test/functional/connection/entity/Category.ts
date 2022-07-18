import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "typeorm/decorator/columns/Column"
import { TreeParent } from "typeorm/decorator/tree/TreeParent"
import { TreeChildren } from "typeorm/decorator/tree/TreeChildren"
import { TreeLevelColumn } from "typeorm/decorator/tree/TreeLevelColumn"
import { Entity } from "typeorm/decorator/entity/Entity"
import { Tree } from "typeorm/decorator/tree/Tree"

@Entity("CaTeGoRy")
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeParent()
    parentCategory: Category

    @TreeChildren({ cascade: true })
    childCategories: Category[]

    @TreeLevelColumn()
    level: number
}
