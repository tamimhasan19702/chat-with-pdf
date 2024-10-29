/** @format */

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;

    // You can now use Axios to send a POST request with the file_key and file_name
    const response = await axios.post("/api/your-endpoint", {
      file_key,
      file_name,
    });

    // ...
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create chat",
      },
      { status: 500 }
    );
  }
}
