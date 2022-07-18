import "reflect-metadata"
import {
    closeTestingConnections,
    createTestingConnections,
} from "../../utils/test-utils"
import { DataSource } from "typeorm/data-source/DataSource"
import { Bar } from "./entity/Bar"

describe("github issues > #1261 onDelete property on foreign key is not modified on sync", () => {
    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [__dirname + "/entity/*{.js,.ts}"],
            })),
    )
    after(() => closeTestingConnections(connections))

    it("should modify onDelete property on foreign key on sync", () =>
        Promise.all(
            connections.map(async (connection) => {
                // Spanner support only NO ACTION clause
                if (connection.driver.options.type === "spanner") return

                await connection.synchronize()

                const queryRunner = connection.createQueryRunner()
                let table = await queryRunner.getTable("bar")
                table!.foreignKeys[0].onDelete!.should.be.equal("SET NULL")

                const metadata = connection.getMetadata(Bar)
                metadata.foreignKeys[0].onDelete = "CASCADE"
                await connection.synchronize()

                table = await queryRunner.getTable("bar")
                table!.foreignKeys[0].onDelete!.should.be.equal("CASCADE")

                await queryRunner.release()
            }),
        ))
})
