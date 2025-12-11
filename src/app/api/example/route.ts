import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Example API route using Prisma
export async function GET() {
  try {
    // Fetch all users to prove database connection works
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      message: "Prisma is set up correctly!",
      userCount: users.length,
      users,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}

// Example POST route
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create a user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to create record",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
