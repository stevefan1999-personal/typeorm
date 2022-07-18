import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn"
import { Column } from "typeorm/decorator/columns/Column"
import { TreeParent } from "typeorm/decorator/tree/TreeParent"
import { TreeChildren } from "typeorm/decorator/tree/TreeChildren"
import { Entity } from "typeorm/decorator/entity/Entity"
import { Tree } from "typeorm/decorator/tree/Tree"
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne"
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn"
import { Product } from "./Product"

@Entity({ name: "categories" })
@Tree("materialized-path")
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeParent()
    parentCategory: Category

    @TreeChildren({ cascade: true })
    childCategories: Category[]

    @ManyToOne(() => Product, (product) => product.categories)
    @JoinColumn()
    product: Product
}
