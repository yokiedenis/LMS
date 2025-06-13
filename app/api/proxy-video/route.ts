// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { fileId } = req.query;

//   if (!fileId || typeof fileId !== "string") {
//     return res.status(400).json({ error: "Invalid file ID" });
//   }

//   try {
//     const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
//     const response = await axios.get(googleDriveUrl, {
//       responseType: "stream",
//     });

//     res.setHeader("Content-Type", response.headers["content-type"]);
//     res.setHeader("Content-Disposition", "inline");
//     response.data.pipe(res);
//   } catch (error) {
//     console.error("Error proxying Google Drive video:", error);
//     res.status(500).json({ error: "Failed to proxy video" });
//   }
// }





 
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId parameter" }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://drive.google.com/uc?export=download&id=${fileId}`, {
      responseType: "stream",
    });

    // Set appropriate headers
    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);
    headers.set("Content-Length", response.headers["content-length"]);

    // Stream the response
    return new NextResponse(response.data, { headers });
  } catch (error) {
    console.error("Error proxying Google Drive video:", error);
    return NextResponse.json({ error: "Failed to proxy video" }, { status: 500 });
  }
}
