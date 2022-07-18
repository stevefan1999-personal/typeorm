import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "typeorm/decorator/columns/Column"
import { TreeParent } from "typeorm/decorator/tree/TreeParent"
import { TreeChildren } from "typeorm/decorator/tree/TreeChildren"
import { Entity } from "typeorm/decorator/entity/Entity"
import { Tree } from "typeorm/decorator/tree/Tree"

@Entity()
@Tree("closure-table", {
    closureTableName: "category_xyz_closure",
    ancestorColumnName: (column) => "ancestor_xyz_" + column.propertyName,
    descendantColumnName: (column) => "descendant_xyz_" + column.propertyName,
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeParent()
    parentCategory: Category

    @TreeChildren({ cascade: true })
    childCategories: Category[]

    // @TreeLevelColumn()
    // level: number;
}
