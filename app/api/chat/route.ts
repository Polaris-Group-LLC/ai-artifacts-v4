import {
  streamObject,
  LanguageModel,
  CoreMessage,
} from 'ai'

import ratelimit, { Duration } from '@/lib/ratelimit'
import { Templates, templatesToPrompt } from '@/lib/templates'
import { getModelClient, getDefaultMode } from '@/lib/models'
import { LLMModel, LLMModelConfig } from '@/lib/models'
import { artifactSchema as schema } from '@/lib/schema'

export const maxDuration = 60

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) : 5
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW ? process.env.RATE_LIMIT_WINDOW as Duration : '1m'

export async function POST(req: Request) {
  const limit = await ratelimit(req.headers.get('x-forwarded-for'), rateLimitMaxRequests, ratelimitWindow)
  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString()
      }
    })
  }

  const { messages, userID, template, model, config }: { messages: CoreMessage[], userID: string, template: Templates, model: LLMModel, config: LLMModelConfig } = await req.json()
  console.log('userID', userID)
  // console.log('template', template)
  console.log('model', model)
  console.log('config', config)

  const { model: modelNameString, apiKey: modelApiKey, ...modelParams } = config
  const modelClient = getModelClient(model, config)

  const stream = await streamObject({
    model: modelClient as LanguageModel,
    schema,
    system: `Your name is Cleo and you are the lead AI agent that is part of the neucleos Collective ingenuity innovation platform. You are a skilled software engineer and UI artist. You do not make mistakes. Generate an artifact. Always use a black background and the maincolors White,  #217CAF, #8e154A, #ECA902, #12B656, #F84e19, #475569,. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
    messages,
    mode: getDefaultMode(model),
    ...modelParams,
  })

  return stream.toTextStreamResponse()
}
