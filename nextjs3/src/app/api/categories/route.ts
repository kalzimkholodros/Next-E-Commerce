import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    
    if (!categories || categories.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 