module.exports = {

    async up(db) {

        const collections = await db
            .listCollections({ name: "users" })
            .toArray();

        if (collections.length === 0) {

            await db.createCollection("users");

        }

        // Unique email index
        await db.collection("users").createIndex(
            { email: 1 },
            { unique: true, name: "users_email_unique" }
        );

        // Role reference index
        await db.collection("users").createIndex(
            { roleId: 1 },
            { name: "users_roleId_index" }
        );

        // Status index
        await db.collection("users").createIndex(
            { status: 1 },
            { name: "users_status_index" }
        );

        console.log("Users collection created successfully");

    },

    async down(db) {

        await db.collection("users").drop();

        console.log("Users migration rolled back");

    }

};