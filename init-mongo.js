db.createUser(
    {
        user: "sa",
        pwd: "ABC123ssi",  
        roles: [{ role: "dbOwner", db: "mybookshop" }]
    }
)