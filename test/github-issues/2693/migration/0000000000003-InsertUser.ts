import { MigrationInterface } from "typeorm/migration/MigrationInterface"
import { QueryRunner } from "typeorm/query-runner/QueryRunner"
import { User } from "../entity/user"

export class InsertUser0000000000003 implements MigrationInterface {
    public up(queryRunner: QueryRunner): Promise<any> {
        const userRepo = queryRunner.connection.getRepository<User>(User)
        return userRepo.save(new User())
    }

    public down(queryRunner: QueryRunner): Promise<any> {
        return Promise.resolve()
    }
}
