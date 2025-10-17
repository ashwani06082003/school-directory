import fs from "fs";
import path from "path";
import { db } from "../../lib/db";
export const config = { api: { bodyParser: false } };

const saveFile = async (file) => {
  const dir = path.join(process.cwd(), "public", "schoolImages");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const safe = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_.]/g, "");
  const name = `${Date.now()}-${safe}`;
  const dest = path.join(dir, name);
  await fs.promises.writeFile(dest, Buffer.from(await file.arrayBuffer()));
  return `/schoolImages/${name}`;
};

const emailValid = (e) => /^\S+@\S+\.\S+$/.test(e) && e.toLowerCase().endsWith("gmail.com");
const mobileValid = (m) => /^[0-9]{10}$/.test(m);

export async function POST(request) {
  try {
    const fd = await request.formData();
    console.log("Received form keys:", Array.from(fd.keys()));

    const get = (k) => fd.get(k)?.toString()?.trim() ?? "";
    const name = get("name"), address = get("address"), city = get("city"), state = get("state");
    const contact = get("contact"), email_id = get("email_id");
    const imageFile = fd.get("image");

    const fieldErrors = {};
    if (!name) fieldErrors.name = "Name is required.";
    if (!address) fieldErrors.address = "Address is required.";
    if (!city) fieldErrors.city = "City is required.";
    if (!state) fieldErrors.state = "State is required.";
    if (!mobileValid(contact)) fieldErrors.contact = "Contact must be a 10-digit number.";
    if (!emailValid(email_id)) fieldErrors.email_id = "Email must be valid and end with gmail.com";
    if (!imageFile || typeof imageFile === "string") fieldErrors.image = "Image file is required.";

    if (Object.keys(fieldErrors).length) {
      return new Response(JSON.stringify({ error: "Validation failed", fieldErrors }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const [emailRows] = await db.query("SELECT id FROM schools WHERE email_id = ? LIMIT 1", [email_id]);
    if (Array.isArray(emailRows) && emailRows.length) fieldErrors.email_id = "This email is already registered.";

    const [contactRows] = await db.query("SELECT id FROM schools WHERE contact = ? LIMIT 1", [contact]);
    if (Array.isArray(contactRows) && contactRows.length) fieldErrors.contact = "This mobile number is already registered.";

    if (Object.keys(fieldErrors).length) {
      return new Response(JSON.stringify({ error: "Duplicates found", fieldErrors }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const imagePath = await saveFile(imageFile);

    try {
      await db.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, imagePath, email_id]
      );
    } catch (dbErr) {
      console.error("DB insert error:", dbErr);
      const dup = dbErr?.code === "ER_DUP_ENTRY";
      if (dup) {
        const dupField = dbErr.message?.includes("email_id") ? "email_id" : dbErr.message?.includes("contact") ? "contact" : null;
        const fe = dupField ? { [dupField]: "Already registered." } : {};
        return new Response(JSON.stringify({ error: "Duplicate entry", fieldErrors: fe }), { status: 409, headers: { "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ error: dbErr?.message || "DB error" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ message: "School added successfully!" }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export async function GET() {
  try {
    // fetch only required columns, newest first
    const [rows] = await db.query("SELECT id, name, email_id, contact, image, address FROM schools ORDER BY id DESC");
    return new Response(JSON.stringify({ schools: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/schools error:", err);
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
