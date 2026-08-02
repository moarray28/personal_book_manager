import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import Book from "@/models/Book";

const VALID_STATUS = [
  "WANT_TO_READ",
  "READING",
  "COMPLETED",
];

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/books/:id
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const book = await Book.findOne({
      _id: id,
      userId: user._id,
    });

    if (!book) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { book },
      { status: 200 }
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

// PATCH /api/books/:id
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const {
      title,
      author,
      tags,
      status,
    } = await request.json();

    const book = await Book.findOne({
      _id: id,
      userId: user._id,
    });

    if (!book) {
      return NextResponse.json(
        { message: "Book not found." },
        { status: 404 }
      );
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return NextResponse.json(
          {
            message: "Title cannot be empty.",
          },
          {
            status: 400,
          }
        );
      }

      book.title = title.trim();
    }

    if (author !== undefined) {
      if (!author.trim()) {
        return NextResponse.json(
          {
            message: "Author cannot be empty.",
          },
          {
            status: 400,
          }
        );
      }

      book.author = author.trim();
    }

    if (status !== undefined) {
      if (!VALID_STATUS.includes(status)) {
        return NextResponse.json(
          {
            message: "Invalid status.",
          },
          {
            status: 400,
          }
        );
      }

      book.status = status;
    }

    if (tags !== undefined) {
      book.tags = Array.isArray(tags)
        ? tags
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [];
    }

    await book.save();

    return NextResponse.json(
      {
        message: "Book updated successfully.",
        book,
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

// DELETE /api/books/:id
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const deletedBook = await Book.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!deletedBook) {
      return NextResponse.json(
        {
          message: "Book not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Book deleted successfully.",
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