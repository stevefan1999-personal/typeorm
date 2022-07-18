import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { UserEntity } from "./UserEntity"
import { OrganizationEntity } from "./OrganizationEntity"

@Entity("user_organization")
export class UserToOrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: ["owner", "editor", "viewer"],
    })
    role: "owner" | "editor" | "viewer"

    @ManyToOne((type) => UserEntity, (user) => user.organizations)
    user: UserEntity

    @ManyToOne(
        (type) => OrganizationEntity,
        (organization) => organization.users,
    )
    organization: OrganizationEntity
}
