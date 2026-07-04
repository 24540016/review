import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./DAO/moviesDAO.js";
import ReviewsDAO from "./DAO/reviewsDAO.js";
async function main() {
    dotenv.config();
    const client = new
        mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        app.listen(port,"0.0.0.0", () => {
            console.log('Server is running on port: ' + port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    };
}

main().catch(console.error);