module.exports = {

    async up(db) {

        // Create roles collection
        const collections = await db
            .listCollections({ name: "roles" })
            .toArray();

        if (collections.length === 0) {

            await db.createCollection("roles");

        }

        // Unique role slug
        await db.collection("roles").createIndex(
            { slug: 1 },
            { unique: true, name: "roles_slug_unique" }
        );

        // Insert default roles
        await db.collection("roles").updateOne(
            { slug: "admin" },
            {
                $setOnInsert: {
                    name: "Administrator",
                    slug: "admin",
                    description: "Full system access",
                    permissions: [
                        "users.create",
                        "users.read",
                        "users.update",
                        "users.delete",
                        "roles.read"
                    ],
                    status: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        await db.collection("roles").updateOne(
            { slug: "user" },
            {
                $setOnInsert: {
                    name: "User",
                    slug: "user",
                    description: "Standard user access",
                    permissions: [
                        "profile.read",
                        "profile.update"
                    ],
                    status: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log("Roles collection created successfully");

    },

    async down(db) {

        await db.collection("roles").drop();

        console.log("Roles migration rolled back");

    }

};