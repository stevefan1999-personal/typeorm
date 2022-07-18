import { expect } from "chai"
import "reflect-metadata"
import { DataSource } from "typeorm"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
    sleep,
} from "../../../utils/test-utils"
import { Post } from "./entity/Post"

describe("column kinds > create date column", () => {
    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [__dirname + "/entity/*{.js,.ts}"],
            })),
    )
    beforeEach(() => reloadTestingDatabases(connections))
    after(() => closeTestingConnections(connections))

    it("create date column should automatically be set by a database", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save a new post
                const post = new Post()
                post.title = "Post"
                await postRepository.save(post)

                // load and check if createdAt is a date (generated by db)
                const loadedPost = await postRepository.findOneBy({
                    id: post.id,
                })
                expect(loadedPost).to.be.not.empty
                expect(loadedPost!.title).to.be.eql("Post")
                expect(loadedPost!.createdAt).to.be.instanceOf(Date)
            }),
        ))

    it("create date column can also be manually set by user", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                const createdAt = new Date(
                    Date.parse("2020-01-01T00:00:00+0000"),
                )

                // save a new post
                const post = new Post()
                post.title = "Post"
                post.createdAt = createdAt
                await postRepository.save(post)

                // load and check if createdAt was a value set by us
                const loadedPost = await postRepository.findOneBy({
                    id: post.id,
                })
                expect(loadedPost).to.be.not.empty
                expect(loadedPost!.title).to.be.eql("Post")
                expect(loadedPost!.createdAt).to.be.eql(createdAt)
            }),
        ))

    it("create date column should not be updated automatically on every change", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save a new post
                const post = new Post()
                post.title = "Post"
                await postRepository.save(post)

                // load to get created date we had after first save
                const loadedPostBeforeUpdate = await postRepository.findOneBy({
                    id: post.id,
                })

                // wait a second
                await sleep(1000)

                // create post once again
                post.title = "Updated Title"
                await postRepository.save(post)

                // check if date was created
                const loadedPostAfterUpdate = await postRepository.findOneBy({
                    id: post.id,
                })
                expect(loadedPostAfterUpdate!.createdAt.toString()).to.be.eql(
                    loadedPostBeforeUpdate!.createdAt.toString(),
                )
            }),
        ))

    it("create date column should set a custom date when specified", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save a new post
                const post = new Post()
                post.title = "Post"
                await postRepository.save(post)

                // create post once again
                const createdAt = new Date(
                    Date.parse("2020-01-01T00:00:00+0000"),
                )
                post.title = "Updated Title"
                post.createdAt = createdAt
                await postRepository.save(post)

                // check if date was created
                const loadedPost = await postRepository.findOneBy({
                    id: post.id,
                })
                expect(loadedPost!.createdAt).to.be.eql(createdAt)
            }),
        ))
})
