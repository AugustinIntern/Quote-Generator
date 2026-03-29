// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';


// interface Quote {
//   Quote: string;
//   Author: string;
//   Tags: string;
//   Popularity: number;
//   Category: string;
// }


// // export async function GetDaily(request: Request) {

// //   console.log("test");
// //   const { searchParams } = new URL(request.url);

// // }


// export async function GET(request: Request) {

//   try {
//     // console.log("test");
//     // Extract the search term from the URL (e.g., /api/quote?term=happiness)
//     const { searchParams } = new URL(request.url);
//     const searchTerm = searchParams.get('term')?.toLowerCase() || "";
//       const daily = searchParams.get('daily') == "true";

//     if (daily) {
//     const today = new Date();
//     const dateSeed = today.getFullYear() * 1000 + (today.getMonth()+1) * 100 + today.getDate();

//     // Point to the JSON file
//     const filePath = path.join(process.cwd(), 'src/data/quotes.json');

//     // Read the file
//     const jsonData = await fs.readFile(filePath, 'utf-8');
//     const allQuotes: Quote[] = JSON.parse(jsonData);

//     // console.log(dateSeed);
//     const dailyIndex = dateSeed % allQuotes.length;
//     return NextResponse.json(allQuotes[dailyIndex]);
//   }

//     // Point to the JSON file
//     const filePath = path.join(process.cwd(), 'src/data/quotes.json');

//     // Read the file
//     const jsonData = await fs.readFile(filePath, 'utf-8');
//     const allQuotes: Quote[] = JSON.parse(jsonData);

//     // Filter the 48k quotes based on the user's input
//     const matches = allQuotes.filter((q: any) => {
//       const quoteText = String(q.Quote || "").toLowerCase();
//       const authorText = String(q.Author || "").toLowerCase();
//       const categoryText = String(q.Category || "").toLowerCase();
//       const tagsText = String(q.Tags || "").toLowerCase();


//       return (
//         quoteText.includes(searchTerm) ||
//         authorText.includes(searchTerm) ||
//         categoryText.includes(searchTerm) ||
//         tagsText.includes(searchTerm)

//       );

//     });

//     //If no matches found, return a fallback message
//     if (matches.length === 0) {
//       return NextResponse.json(
//         { message: "No quotes found for that topic. Try 'Life' or 'Wisdom'." },
//         { status: 404 }
//       );
//     }

//     // Pick ONE random quote from the matching results
//     const randomIndex = Math.floor(Math.random() * matches.length);
//     const selectedQuote = matches[randomIndex];

//     return NextResponse.json(selectedQuote);

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to read quote data." },
//       { status: 500 }
//     );
//   }
// }

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
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_QUOTES_API_KEY! }, 
  });

  const data = await res.json();


  if (daily) {
    const res = await fetch(`https://api.api-ninjas.com/v2/quoteoftheday`, {
      headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_QUOTES_API_KEY! }, 
    });
    const Dailydata = await res.json();
    return NextResponse.json(Dailydata);
  }
    return NextResponse.json(data);
}