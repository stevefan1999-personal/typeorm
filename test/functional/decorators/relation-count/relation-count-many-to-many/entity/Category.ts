import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn"
import { Entity } from "typeorm/decorator/entity/Entity"
import { Column } from "typeorm/decorator/columns/Column"
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany"
import { JoinTable } from "typeorm/decorator/relations/JoinTable"
import { RelationCount } from "typeorm/decorator/relations/RelationCount"
import { Post } from "./Post"
import { Image } from "./Image"

@Entity()
export class Category {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    isRemoved: boolean = false

    @ManyToMany((type) => Post, (post) => post.categories)
    posts: Post[]

    @ManyToMany((type) => Image, (image) => image.categories)
    @JoinTable()
    images: Image[]

    @RelationCount((category: Category) => category.posts)
    postCount: number

    @RelationCount(
        (category: Category) => category.posts,
        "removedPosts",
        (qb) =>
            qb.andWhere("removedPosts.isRemoved = :isRemoved", {
                isRemoved: true,
            }),
    )
    removedPostCount: number

    @RelationCount((category: Category) => category.images)
    imageCount: number

    @RelationCount(
        (category: Category) => category.images,
        "removedImages",
        (qb) =>
            qb.andWhere("removedImages.isRemoved = :isRemoved", {
                isRemoved: true,
            }),
    )
    removedImageCount: number
}
