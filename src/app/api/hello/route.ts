import { NextResponse } from "next/server";
import { exec } from "child_process";




export const POST = async (req: Request, res: Response) => {
    try {
        const { programPath } = await req.json();


    }
    catch (err) {
        return NextResponse.json({
            message: "Error", err
        },
            {
                status: 500
            },
        )
    }
}