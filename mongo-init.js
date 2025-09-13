try {
    rs.initiate({
        _id: "rs0",
        members: [{ _id: 0, host: "localhost:27017" }]
    });
    print("Replica set rs0 iniciado en localhost:27017");
} catch (e) {
    print("init ya ejecutado o error:", e);
}
