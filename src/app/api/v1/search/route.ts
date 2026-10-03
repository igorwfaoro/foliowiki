import { auth } from "@/auth";import { createKnowledgeProvider } from "@/core/knowledge/provider-factory";import { z } from "zod";
const schema=z.string().trim().min(2).max(120);
export async function GET(request:Request){const session=await auth();if(!session?.accessToken)return Response.json({error:"Unauthorized"},{status:401});const parsed=schema.safeParse(new URL(request.url).searchParams.get("q"));if(!parsed.success)return Response.json({error:"Invalid query"},{status:400});return Response.json(await createKnowledgeProvider().search(parsed.data,{accessToken:session.accessToken}))}
