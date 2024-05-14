import { createPointInTime, ES_INDICES, ES_INDICES_TYPE } from "@sicap/api";
import { withBearerToken } from "../middleware/withBearerToken";
import { NextResponse } from "next/server";

export const GET = withBearerToken(async (request) => {
  const searchParams = new URLSearchParams(request.url?.split("?")[1]);

  if (
    !searchParams.get("index") ||
    ES_INDICES.includes(searchParams.get("index") as ES_INDICES_TYPE) === false
  ) {
    return new NextResponse("Missing index parameter", { status: 400 });
  }
  const pointInTime = await createPointInTime(searchParams.get("index") as ES_INDICES_TYPE);
  return NextResponse.json(pointInTime);
});
