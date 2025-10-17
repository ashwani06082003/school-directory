import { db } from '@/lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), '/public/schoolImages');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { name, address, city, state, contact, email_id } = fields;
      const imagePath = '/schoolImages/' + path.basename(files.image[0].filepath);

      try {
        await db.query(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name[0], address[0], city[0], state[0], contact[0], imagePath, email_id[0]]
        );
        return res.status(200).json({ message: 'School added successfully!' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
