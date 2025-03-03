import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate({
        path: 'category',
        select: '_id name'
      })
      .sort({ createdAt: -1 });

    if (!products) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 