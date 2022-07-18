import "reflect-metadata"
import { Post } from "./entity/Post"
import { DataSource } from "typeorm/data-source/DataSource"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils"

describe("database schema > column collation > mssql", () => {
    let connections: DataSource[]
    before(async () => {
        connections = await createTestingConnections({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql"],
        })
    })
    beforeEach(() => reloadTestingDatabases(connections))
    after(() => closeTestingConnections(connections))

    it("should correctly create column with collation option", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)
                const queryRunner = connection.createQueryRunner()
                const table = await queryRunner.getTable("post")
                await queryRunner.release()

                const post = new Post()
                post.id = 1
                post.name = "Post"
                await postRepository.save(post)

                table!
                    .findColumnByName("name")!
                    .collation!.should.be.equal("French_CI_AS")
            }),
        ))
})
