import { app } from '../src/app.js'

export const onRequest: PagesFunction = (ctx) =>
  app.fetch(ctx.request, ctx.env, ctx)
