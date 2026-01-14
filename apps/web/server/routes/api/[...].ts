import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { appRouter } from "@my-better-t-app-3/api/routers/index";
import { createContext } from "@my-better-t-app-3/api/context";

const openAPIHandler = new OpenAPIHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "My Better T App API",
          version: "1.0.0",
        },
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      },
    }),
  ],
});

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);

  const context = await createContext({
    headers: request.headers,
  });

  const { response } = await openAPIHandler.handle(request, {
    prefix: "/api",
    context,
  });

  if (response) {
    return response;
  }

  setResponseStatus(event, 404, "Not Found");
  return "Not Found";
});
