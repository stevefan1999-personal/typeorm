import { ChildEntity, Column } from "typeorm"
import { ContentType } from "./Content"
import { Photo } from "./Photo"

@ChildEntity(ContentType.SpecialPhoto)
export class SpecialPhoto extends Photo {
    @Column()
    specialProperty: number
}
