interface Quote {
  Quote: string;
  Author: string;
  Tags: string;
  Popularity: number;
  Category: string;
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log("test");
  const { searchParams } = new URL(request.url);
  const daily = searchParams.get('daily') == "true";

  const res = await fetch(`https://api.api-ninjas.com/v2/randomquotes`, {
    headers: { 'X-Api-Key': "b4nYYr2JunjBQNY4zLUDk5Za8wCPcQZ7NuVDQKMZ" }, 
  });

  const data = await res.json();


  if (daily) {
    const res = await fetch(`https://api.api-ninjas.com/v2/quoteoftheday`, {
      headers: { 'X-Api-Key': "b4nYYr2JunjBQNY4zLUDk5Za8wCPcQZ7NuVDQKMZ" }, 
    });
    const Dailydata = await res.json();
    return NextResponse.json(Dailydata);
  }
    return NextResponse.json(data);
}