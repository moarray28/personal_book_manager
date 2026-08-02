import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import Book from "@/models/Book";

const VALID_STATUS = [
  "WANT_TO_READ",
  "READING",
  "COMPLETED",
];

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const books = await Book.find({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        books,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      title,
      author,
      tags,
      status,
    } = await request.json();

    if (!title?.trim()) {
      return NextResponse.json(
        {
          message: "Title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!author?.trim()) {
      return NextResponse.json(
        {
          message: "Author is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!VALID_STATUS.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid book status.",
        },
        {
          status: 400,
        }
      );
    }

    const book = await Book.create({
      userId: user._id,
      title: title.trim(),
      author: author.trim(),
      tags: Array.isArray(tags)
        ? tags.map((tag: string) => tag.trim()).filter(Boolean)
        : [],
      status,
    });

    return NextResponse.json(
      {
        message: "Book created successfully.",
        book,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}