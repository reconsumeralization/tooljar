
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

class LinkGeneratorModel {
    // Generate a new link
    public static async generate(appID: string): Promise<string> {
        try {
            const linkID = uuidv4();
            const link = `${process.env.BASE_URL}/app/${linkID}`;

            const query = {
                text: 'INSERT INTO links(id, app_id, link) VALUES($1, $2, $3)',
                values: [linkID, appID, link],
            };

            await pool.query(query);

            return link;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Get all generated links
    public static async find(): Promise<Array<object>> {
        try {
            const query = {
                text: 'SELECT * FROM links',
            };

            const { rows } = await pool.query(query);

            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default LinkGeneratorModel;
