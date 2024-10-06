# Neucleos Project Documentation

## Table of Contents

1. [app](#1-app)
   1.1. [api/chat/route.ts](#11-apichatroutets)
   1.2. [api/chat-o1/route.ts](#12-apichat-o1routets)
   1.3. [api/sandbox/route.ts](#13-apisandboxroutets)
   1.4. [favicon.ico](#14-faviconico)
   1.5. [globals.css](#15-globalscss)
   1.6. [layout.tsx](#16-layouttsx)
   1.7. [page.tsx](#17-pagetsx)
   1.8. [providers.tsx](#18-providerstsx)
   1.9. [xterm.css](#19-xtermcss)

2. [components](#2-components)
   2.1. [ui/alert.tsx](#21-uialerttsx)
   2.2. [ui/button.tsx](#22-uibuttontsx)
   2.3. [ui/card.tsx](#23-uicardtsx)
   2.4. [ui/dialog.tsx](#24-uidialogtsx)
   2.5. [ui/dropdown-menu.tsx](#25-uidropdown-menutsx)
   2.6. [ui/input.tsx](#26-uiinputtsx)
   2.7. [ui/label.tsx](#27-uilabeltsx)
   2.8. [ui/select.tsx](#28-uiselecttsx)
   2.9. [ui/separator.tsx](#29-uiseparatortsx)
   2.10. [ui/skeleton.tsx](#210-uiskeletontsx)
   2.11. [ui/tabs.tsx](#211-uitabstsx)
   2.12. [AuthDialog.tsx](#212-authdialogtsx)
   2.13. [AuthForm.tsx](#213-authformtsx)
   2.14. [Spinner.tsx](#214-spinnertsx)
   2.15. [Terminal.tsx](#215-terminaltsx)
   2.16. [artifact-view.tsx](#216-artifact-viewtsx)
   2.17. [chat.tsx](#217-chattsx)
   2.18. [code-theme.css](#218-code-themecss)
   2.19. [code-view.tsx](#219-code-viewtsx)
   2.20. [navbar.tsx](#220-navbartsx)
   2.21. [side-view.tsx](#221-side-viewtsx)
   2.22. [useSandbox.ts](#222-usesandboxts)
   2.23. [useTerminal.ts](#223-useterminalts)

3. [lib](#3-lib)
   3.1. [auth.ts](#31-authts)
   3.2. [messages.ts](#32-messagests)
   3.3. [models.json](#33-modelsjson)
   3.4. [models.ts](#34-modelsts)
   3.5. [ratelimit.ts](#35-ratelimitts)
   3.6. [schema.ts](#36-schemats)
   3.7. [supabase.ts](#37-supabasets)
   3.8. [templates.json](#38-templatesjson)
   3.9. [templates.ts](#39-templatests)
   3.10. [types.ts](#310-typests)
   3.11. [utils.ts](#311-utilsts)

4. [public](#4-public)
   4.1. [thirdparty/logos](#41-thirdpartylogos)
   4.2. [thirdparty/templates](#42-thirdpartytemplates)
   4.3. [logo.svg](#43-logosvg)
   4.4. [next.svg](#44-nextsvg)
   4.5. [vercel.svg](#45-vercelsvg)

5. [sandbox-templates](#5-sandbox-templates)
   5.1. [gradio-developer](#51-gradio-developer)
   5.2. [nextjs-developer](#52-nextjs-developer)
   5.3. [streamlit-developer](#53-streamlit-developer)
   5.4. [vue-developer](#54-vue-developer)

## 1. app

### 1.1. api/chat/route.ts

### 1.2. api/chat-o1/route.ts

### 1.3. api/sandbox/route.ts

### 1.4. favicon.ico

### 1.5. globals.css

### 1.6. layout.tsx

### 1.7. page.tsx

### 1.8. providers.tsx

### 1.9. xterm.css

## 2. components

### 2.1. ui/alert.tsx

### 2.2. ui/button.tsx

### 2.3. ui/card.tsx

### 2.4. ui/dialog.tsx

### 2.5. ui/dropdown-menu.tsx

### 2.6. ui/input.tsx

### 2.7. ui/label.tsx

### 2.8. ui/select.tsx

### 2.9. ui/separator.tsx

### 2.10. ui/skeleton.tsx

### 2.11. ui/tabs.tsx

### 2.12. AuthDialog.tsx

### 2.13. AuthForm.tsx

### 2.14. Spinner.tsx

### 2.15. Terminal.tsx

### 2.16. artifact-view.tsx

### 2.17. chat.tsx

### 2.18. code-theme.css

### 2.19. code-view.tsx

### 2.20. navbar.tsx

### 2.21. side-view.tsx

### 2.22. useSandbox.ts

### 2.23. useTerminal.ts

## 3. lib

### 3.1. auth.ts

### 3.2. messages.ts

### 3.3. models.json

### 3.4. models.ts

### 3.5. ratelimit.ts

### 3.6. schema.ts

### 3.7. supabase.ts

### 3.8. templates.json

### 3.9. templates.ts

### 3.10. types.ts

### 3.11. utils.ts

## 4. public

### 4.1. thirdparty/logos

### 4.2. thirdparty/templates

### 4.3. logo.svg

### 4.4. next.svg

### 4.5. vercel.svg

## 5. sandbox-templates

### 5.1. gradio-developer

### 5.2. nextjs-developer

### 5.3. streamlit-developer

### 5.4. vue-developer


# How this works

Certainly, Jason. I'd be happy to help you understand how this program works. Let's break it down step by step.

This application appears to be an AI-powered artifact generation tool, built using Next.js 14 with the App Router. It allows users to interact with various AI models to generate code artifacts based on different templates. Here's an overview of how it works:

1. Main Application Structure:
   The main page of the application is defined in:


```1:233:app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { useLocalStorage } from 'usehooks-ts'
import { usePostHog } from 'posthog-js/react'
import { ArtifactSchema, artifactSchema as schema } from '@/lib/schema'

import { Chat } from '@/components/chat'
import { SideView } from '@/components/side-view'
import NavBar from '@/components/navbar'

import { supabase } from '@/lib/supabase'
import { AuthDialog } from '@/components/AuthDialog'
import { AuthViewType, useAuth } from '@/lib/auth'
import { Message, toAISDKMessages, toMessageImage } from '@/lib/messages'

import { LLMModel, LLMModelConfig } from '@/lib/models'
import modelsList from '@/lib/models.json'
import templates, { TemplateId } from '@/lib/templates';

import { ExecutionResult } from './api/sandbox/route';
export default function Home() {
  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const [files, setFiles] = useState<FileList | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<'auto' | TemplateId>('auto')
  const [languageModel, setLanguageModel] = useLocalStorage<LLMModelConfig>('languageModel', {
    model: 'claude-3-5-sonnet-20240620'
  })

  const posthog = usePostHog()

  const [result, setResult] = useState<ExecutionResult>()
  const [messages, setMessages] = useState<Message[]>([])
  const [artifact, setArtifact] = useState<Partial<ArtifactSchema> | undefined>()
  const [currentTab, setCurrentTab] = useState<'code' | 'artifact'>('code')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  const [authView, setAuthView] = useState<AuthViewType>('sign_in')
  const { session, apiKey, setSession } = useAuth(setAuthDialog, setAuthView)

  const currentModel = modelsList.models.find(model => model.id === languageModel.model)
  const currentTemplate = selectedTemplate === 'auto' ? templates : { [selectedTemplate]: templates[selectedTemplate] }

  const { object, submit, isLoading, stop, error } = useObject({
    api: currentModel?.id === 'o1-preview' || currentModel?.id === 'o1-mini' ? '/api/chat-o1' : '/api/chat',
    schema,
    onFinish: async ({ object: artifact, error }) => {
      if (!error) {
        // send it to /api/sandbox
        console.log('artifact', artifact)
        posthog.capture('artifact_generated', {
          template: artifact?.template,
        })

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            artifact,
            userID: session?.user?.id,
            apiKey
          })
        })

        const result = await response.json()
        console.log('result', result)
        posthog.capture('sandbox_created', { url: result.url })

        setResult(result)
        setCurrentTab('artifact')
        setIsPreviewLoading(false)
      }
    }
  })
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authOrigin = params.get('arcgis-auth-origin');
    const authToken = params.get('arcgis-auth-token');

    console.log('Auth params:', { authOrigin, authToken });

    if (authOrigin && authToken) {
      console.log('Attempting to authenticate with token');
      authenticateWithToken(authToken);

      window.addEventListener('message', (event) => {
        console.log('Received message:', event);
        if (event.origin !== authOrigin) {
          console.error('Received message from untrusted origin:', event.origin);
          return;
        }

        if (event.data.type === 'AUTH_RESPONSE') {
          console.log('Received AUTH_RESPONSE, authenticating with new token');
          authenticateWithToken(event.data.token);
        }
      });

      console.log('Event listener for AUTH_RESPONSE set up');
    } else {
      console.log('No auth params found in URL');
    }
  }, []);

  function authenticateWithToken(token: string) {
    console.log('Authenticating with token:', token);
    if (supabase) {
      supabase.auth.setSession({ access_token: token, refresh_token: '' })
        .then(({ data, error }) => {
          if (error) {
            console.error('Error setting session:', error);
          } else {
            console.log('Session set successfully:', data.session);
            setSession(data.session);
          }
        });
    } else {
      console.error('Supabase client is not initialized');
    }
  }
  function requestFreshToken() {
    const authOrigin = new URLSearchParams(window.location.search).get('arcgis-auth-origin');
    console.log('Requesting fresh token from origin:', authOrigin);
    if (authOrigin) {
      window.parent.postMessage({ type: 'AUTH_REQUEST' }, authOrigin);
      console.log('AUTH_REQUEST sent to parent');
    } else {
      console.error('No auth origin found for requesting fresh token');
    }
  }

  useEffect(() => {
    if (object) {
      setArtifact(object as ArtifactSchema)
      const lastAssistantMessage = messages.findLast(message => message.role === 'assistant')
      if (lastAssistantMessage) {
        lastAssistantMessage.content = [{ type: 'text', text: object.commentary || '' }, { type: 'code', text: object.code || '' }]
        lastAssistantMessage.meta = {
          title: object.title,
          description: object.description
        }
      }
    }
  }, [object])

  async function handleSubmitAuth (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (isLoading) {
      stop()
    }

    const content: Message['content'] = [{ type: 'text', text: chatInput }]
    const images = await toMessageImage(files)

    if (images.length > 0) {
      images.forEach(image => {
        content.push({ type: 'image', image })
      })
    }

    const updatedMessages = addMessage({
      role: 'user',
      content,
    })

    submit({
      userID: session?.user?.id,
      messages: toAISDKMessages(updatedMessages),
      template: currentTemplate,
      model: currentModel,
      config: languageModel,
    })

    addMessage({
      role: 'assistant',
      content: [{ type: 'text', text: 'Generating artifact...' }],
    })

    setChatInput('')
    setFiles(null)
    setCurrentTab('code')
    setIsPreviewLoading(true)

    posthog.capture('chat_submit', {
      template: selectedTemplate,
      model: languageModel.model,
    })
  }
  function addMessage (message: Message) {
    setMessages(previousMessages => [...previousMessages, message])
    return [...messages, message]
  }

  function handleSaveInputChange (e: React.ChangeEvent<HTMLInputElement>) {
    setChatInput(e.target.value)
  }

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  function logout () {
    supabase ? supabase.auth.signOut() : console.warn('Supabase is not initialized')
  }

  function handleLanguageModelChange (e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e })
  }

  function handleGitHubClick () {
    window.open('https://github.com/e2b-dev/ai-artifacts', '_blank')
    posthog.capture('github_click')
  }

  function handleNewChat () {
    stop()
    setMessages([])
    setArtifact(undefined)
    setResult(undefined)
    setCurrentTab('code')
    setIsPreviewLoading(false)
  }
```


   This file sets up the main UI components and manages the state of the application.

2. Chat Interface:
   The chat interface is implemented in:


```1:88:components/chat.tsx
import { ArrowUp, ImagePlus, Square, Terminal, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Message, MessageText } from '@/lib/messages'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
// simulate simple monte carlo method with 1000 iterations. At each iteration, create a point and check if that point was inside the unit circle. If the point was inside, make it green. At the end show me visualization that shows all the points that you created in every iteration

export function Chat({
  isLoading,
  stop,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isMultiModal,
  files,
  handleFileChange,
}: {
  isLoading: boolean,
  stop: () => void,
  messages: Message[],
  input: string,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  isMultiModal: boolean,
  files: FileList | null,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  ...
  return (
    <div className="flex-1 flex flex-col py-4 gap-4 max-h-full max-w-[800px] mx-auto justify-between">
      <div id="chat-container" className="flex flex-col gap-2 overflow-y-auto max-h-full px-4 rounded-lg">
        {messages.map((message: Message, index: number) => (
          <div className={`py-2 px-4 shadow-sm whitespace-pre-wrap ${message.role !== 'user' ? 'bg-white/5 border text-muted-foreground' : 'bg-white/20'} rounded-lg font-serif`} key={index}>
            {message.content.map((content, id) => {
              if (content.type === 'text') {
                return <p key={content.text} className="flex-1">{content.text}</p>
              }

              if (content.type === 'image') {
                return <img key={id} src={content.image} alt="artifact" className="mr-2 inline-block w-[50px] h-[50px] object-contain border border-[#FFE7CC] rounded-lg bg-white mt-2" />
              }
            })}
            {message.meta &&
              <div className="mt-4 flex justify-start items-start border rounded-md">
                <div className="p-2 self-stretch border-r w-14 flex items-center justify-center">
                  <Terminal strokeWidth={2} className="text-[#FF8800]"/>
                </div>
                <div className="p-2 flex flex-col space-y-1 justify-start items-start min-w-[100px]">
                  <span className="font-bold font-sans text-sm text-primary">{message.meta.title}</span>
                  <span className="font-sans text-sm">{message.meta.description}</span>
                </div>
              </div>
            }
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center">
          <div className="relative">
            <input type="file" id="multimodal" name="multimodal" accept="image/*" multiple={true} className="hidden" onChange={handleFileChange} />
            <Button disabled={!isMultiModal} type="button" variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={(e) => { e.preventDefault(); document.getElementById('multimodal')?.click() }}>
              <ImagePlus className="h-5 w-5" />
            </Button>
            { files && <div className="absolute top-[-3px] right-[-3px] bg-[#ff8800] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{files.length}</div> }
          </div>
          <Input className="ring-0 rounded-xl" required={true} placeholder="Describe your app..." value={input} onChange={handleInputChange}/>
          { !isLoading ? (
              <Button variant="secondary" size="icon" className='rounded-full h-10 w-11'>
                <ArrowUp className="h-5 w-5" />
              </Button>
          ) : (
              <Button variant="secondary" size="icon" className='rounded-full h-10 w-11' onClick={(e) => { e.preventDefault(); stop() }}>
                <Square className="h-5 w-5" />
              </Button>
            )
          }
        </form>
      </div>
```


   This component handles user input, file uploads, and displays the chat messages.

3. API Routes:
   There are two main API routes for handling chat requests:

   a. Standard chat route:
   
```1:50:app/api/chat/route.ts
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
    system: `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
    messages,
    mode: getDefaultMode(model),
    ...modelParams,
  })

  return stream.toTextStreamResponse()
}
```


   b. O1 (possibly a specific model) chat route:
   
```1:64:app/api/chat-o1/route.ts
import {
  streamObject,
  LanguageModel,
  CoreMessage,
  generateText,
} from 'ai'

import ratelimit from '@/lib/ratelimit'
import { Templates, templatesToPrompt } from '@/lib/templates'
import { getModelClient, getDefaultMode } from '@/lib/models'
import { LLMModel, LLMModelConfig } from '@/lib/models'
import { artifactSchema as schema } from '@/lib/schema'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 60

const rateLimitMaxRequests = 15
const ratelimitWindow = '1m'
export async function POST(req: Request) {
  const limit = await ratelimit('o1', rateLimitMaxRequests, ratelimitWindow)
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

  const systemPrompt = `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`

  messages.unshift({
    role: 'user',
    content: systemPrompt,
  })

  const { text } = await generateText({
    model: modelClient as LanguageModel,
    messages,
    ...modelParams,
  })
  const stream = await streamObject({
    model: openai('gpt-4o-mini') as LanguageModel,
    schema,
    system: `Please extract as required by the schema from the response. You can use one of the following templates:\n${templatesToPrompt(template)}`,
    prompt: text,
    ...modelParams,
  })

  return stream.toTextStreamResponse()
}
```


   These routes handle the communication with various AI models and stream the responses back to the client.

4. Sandbox Execution:
   Once an artifact is generated, it's executed in a sandbox environment:


```18:74:app/api/sandbox/route.ts
export async function POST(req: Request) {
  const { artifact, userID, apiKey }: { artifact: ArtifactSchema, userID: string, apiKey: string } = await req.json()
  console.log('artifact', artifact)
  console.log('userID', userID)
  console.log('apiKey', apiKey)

  let sbx: Sandbox | CodeInterpreter | undefined = undefined

  // Create a interpreter or a sandbox
  if (artifact.template === 'code-interpreter-multilang') {
    sbx = await CodeInterpreter.create({ metadata: { template: artifact.template, userID: userID }, timeoutMs: sandboxTimeout, apiKey })
    console.log('Created code interpreter', sbx.sandboxID)
  } else {
    sbx = await Sandbox.create(artifact.template, { metadata: { template: artifact.template, userID: userID }, timeoutMs: sandboxTimeout, apiKey })
    console.log('Created sandbox', sbx.sandboxID)
  }

  // Install packages
  if (artifact.has_additional_dependencies) {
    if (sbx instanceof CodeInterpreter) {
      await sbx.notebook.execCell(artifact.install_dependencies_command)
      console.log(`Installed dependencies: ${artifact.additional_dependencies.join(', ')} in code interpreter ${sbx.sandboxID}`)
    } else if (sbx instanceof Sandbox) {
      await sbx.commands.run(artifact.install_dependencies_command)
      console.log(`Installed dependencies: ${artifact.additional_dependencies.join(', ')} in sandbox ${sbx.sandboxID}`)
    }
  }
  // Copy code to fs
  if (artifact.code && Array.isArray(artifact.code)) {
    artifact.code.forEach(async (file) => {
      await sbx.files.write(file.file_path, file.file_content)
      console.log(`Copied file to ${file.file_path} in ${sbx.sandboxID}`)
    })
  } else {
    await sbx.files.write(artifact.file_path, artifact.code)
    console.log(`Copied file to ${artifact.file_path} in ${sbx.sandboxID}`)
  }

  // Execute code or return a URL to the running sandbox
  if (artifact.template === 'code-interpreter-multilang') {
    const result = await (sbx as CodeInterpreter).notebook.execCell(artifact.code || '')
    await (sbx as CodeInterpreter).close()
    return new Response(JSON.stringify({
      template: artifact.template,
      stdout: result.logs.stdout,
      stderr: result.logs.stderr,
      runtimeError: result.error,
      cellResults: result.results,
    }))
  } else {
    return new Response(JSON.stringify({
      template: artifact.template,
      url: `https://${sbx?.getHost(artifact.port || 80)}`
    }))
  }
}
```


   This route creates a sandbox or code interpreter based on the artifact template, installs dependencies, copies the generated code, and either executes it or returns a URL to the running sandbox.

5. Templates:
   The application supports various templates for different types of projects:


```1:54:lib/templates.json
{
  "code-interpreter-multilang": {
    "name": "Python data analyst",
    "lib": ["python", "jupyter", "numpy", "pandas", "matplotlib", "seaborn", "plotly"],
    "file": "script.py",
    "instructions": "Runs code as a Jupyter notebook cell. Strong data analysis angle. Can use complex visualisation to explain results.",
    "port": null
  },
  "nextjs-developer": {
    "name": "Next.js developer",
    "lib": ["nextjs@14.2.5", "typescript", "@types/node", "@types/react", "@types/react-dom", "postcss", "tailwindcss", "shadcn"],
    "file": "pages/index.tsx",
    "instructions": "A Next.js 13+ app that reloads automatically. Using the pages router.",
    "port": 3000
  },
  "vue-developer": {
    "name": "Vue.js developer",
    "lib": ["vue@latest", "nuxt@3.13.0", "tailwindcss"],
    "file": "app.vue",
    "instructions": "A Vue.js 3+ app that reloads automatically. Only when asked specifically for a Vue app.",
    "port": 3000
  },
  "streamlit-developer": {
    "name": "Streamlit developer",
    "lib": [
      "streamlit",
      "pandas",
      "numpy",
      "matplotlib",
      "request",
      "seaborn",
      "plotly"
    ],
    "file": "app.py",
    "instructions": "A streamlit app that reloads automatically.",
    "port": 8501
  },
  "gradio-developer": {
    "name": "Gradio developer",
    "lib": [
      "gradio",
      "pandas",
      "numpy",
      "matplotlib",
      "request",
      "seaborn",
      "plotly"
    ],
    "file": "app.py",
    "instructions": "A gradio app. Gradio Blocks/Interface should be called demo.",
    "port": 7860
  }
}

```


   These templates define the available environments and their configurations.

6. Model Management:
   The application supports multiple AI models, which are likely defined and managed in `lib/models.ts` and `lib/models.json`.

7. Authentication:
   The app uses Supabase for authentication, as seen in the `useAuth` hook usage in the main page component.

8. Artifact View:
   Once an artifact is generated and executed, it's displayed using the ArtifactView component:


```1:97:components/artifact-view.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Terminal } from 'lucide-react'

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert'
import { ExecutionResult } from '@/app/api/sandbox/route'
import { TemplateId } from '@/lib/templates'

function LogsOutput({ stdout, stderr }: {
  stdout: string[]
  stderr: string[]
}) {
  if (stdout.length === 0 && stderr.length === 0) return null

  return (
    <div className="w-full h-32 max-h-32 overflow-y-auto flex flex-col items-start justify-start space-y-1 p-4 border-t">
      {stdout && stdout.length > 0 && stdout.map((out: string, index: number) => (
        <pre key={index} className="text-xs">
          {out}
        </pre>
      ))}
      {stderr && stderr.length > 0 && stderr.map((err: string, index: number) => (
        <pre key={index} className="text-xs text-red-500">
          {err}
        </pre>
      ))}
    </div>
  )
}
export function ArtifactView({
  iframeKey,
  result,
  template,
}: {
  iframeKey: number
  result: ExecutionResult
  template?: TemplateId
}) {
  if (!result) return null

  if (template !== 'code-interpreter-multilang') {
    return (
      <div className="w-full h-full">
        <iframe
          key={iframeKey}
          className="h-full w-full"
          sandbox="allow-forms allow-scripts allow-same-origin"
          loading="lazy"
          src={result.url}
        />
      </div>
    )
  }

  const { cellResults, stdout, stderr, runtimeError } = result

  // The AI-generated code experienced runtime error
  if (runtimeError) {
    const { name, value, tracebackRaw } = runtimeError
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4"/>
          <AlertTitle>{name}: {value}</AlertTitle>
          <AlertDescription className="font-mono whitespace-pre-wrap">
            {tracebackRaw}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Cell results can contain text, pdfs, images, and code (html, latex, json)
  // TODO: Show all results
  // TODO: Check other formats than `png`
  if (cellResults.length > 0) {
    const imgInBase64 = cellResults[0].png
    return (
      <>
        <div className="w-full flex-1 p-4 flex items-start justify-center">
          <Image
            src={`data:image/png;base64,${imgInBase64}`}
            alt="result"
            width={600}
            height={400}
          />
        </div>
        <LogsOutput stdout={stdout} stderr={stderr} />
      </>
    )
  }
```


   This component handles displaying the results, including images, logs, and iframes for web applications.

9. Module Federation:
   The application is set up to use Module Federation, allowing it to share components across different applications:


````1:101:module-federation-README.md
# Module Federation Setup and Usage

## What We've Done

We've configured our Next.js application to use Module Federation, allowing us to share components and pages across different applications. Specifically, we've set up our main page (`app/page.tsx`) to be shared as a federated module.

### Configuration Details

1. We've modified `next.config.mjs` to use the `NextFederationPlugin` from `@module-federation/nextjs-mf`.
2. Our app is named 'app1' in the federation configuration.
3. We're exposing our main page component (`app/page.tsx`) as './Page'.
4. React and ReactDOM are set as shared dependencies to ensure consistency.
5. We've enabled `exposePages` to automatically expose all Next.js pages.

## For Developers: How to Dynamically Import Shared Components

To use the shared components in another application (let's call it the host application), follow these steps:

1. Install the necessary dependencies in your host application:

   ```bash
   npm install @module-federation/nextjs-mf
   ```

2. Configure the host application's `next.config.mjs`:

   ```javascript
   import { NextFederationPlugin } from '@module-federation/nextjs-mf';

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     webpack(config, options) {
       config.plugins.push(
         new NextFederationPlugin({
           name: 'host',
           remotes: {
             app1: 'app1@http://localhost:3000/_next/static/chunks/remoteEntry.js',
           },
           shared: {
             react: { singleton: true, eager: true, requiredVersion: false },
             'react-dom': { singleton: true, eager: true, requiredVersion: false },
           },
         })
       );
       return config;
     },
   };

   export default nextConfig;
   ```

   Note: Replace `http://localhost:3000` with the actual URL where app1 is hosted.

3. To dynamically import the shared page in your host application:

   ```typescript
   import dynamic from 'next/dynamic';
   import { Suspense } from 'react';

   const RemotePage = dynamic(() => import('app1/Page'), {
     ssr: false, // Set to true if you want server-side rendering
   });

   export default function HostPage() {
     return (
       <div>
         <h1>Host Application</h1>
         <Suspense fallback={<div>Loading remote page...</div>}>
           <RemotePage />
         </Suspense>
       </div>
     );
   }
   ```

4. For TypeScript support, you may need to add type declarations. Create a `remote-types.d.ts` file in your host app:

   ```typescript
   declare module 'app1/Page' {
     const Page: React.ComponentType;
     export default Page;
   }
   ```

## Important Notes

- Ensure that the versions of React and Next.js are compatible across your federated applications.
- Be cautious with server components when using Module Federation, as they may not always work as expected.
- Always test thoroughly in a staging environment before deploying to production.
- Keep an eye on the [@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf) package for updates and potential breaking changes.

## Troubleshooting

If you encounter issues:
1. Check that all applications are running and accessible.
2. Verify that the remote entry URL is correct in the host configuration.
3. Clear browser caches and rebuild both applications.
4. Consult the [Module Federation Examples](https://github.com/module-federation/module-federation-examples) for more complex setups and solutions.

Remember to adjust these instructions based on your specific setup and requirements. Module Federation in Next.js is a powerful but complex feature, so don't hesitate to refer to the official documentation and community resources for advanced use cases or troubleshooting.

````


   This setup allows for more modular and scalable architecture.

The flow of the application typically goes like this:
1. User inputs a prompt in the chat interface.
2. The input is sent to the appropriate API route based on the selected model.
3. The AI model generates an artifact based on the prompt and selected template.
4. The generated artifact is sent to the sandbox API for execution.
5. The results are streamed back to the client and displayed in the ArtifactView component.

This application demonstrates a sophisticated use of Next.js, AI integration, and sandbox environments to provide a powerful tool for generating and executing code artifacts based on user prompts.


# How this works:

The area where the artifacts are rendered is handled by the `ArtifactView` component. This component is called within the `SideView` component that you've provided. Here's the relevant section:


```112:118:components/side-view.tsx
            <TabsContent value="artifact" className="flex-1 w-full flex flex-col items-start justify-start">
              {result &&
                <ArtifactView
                  iframeKey={iframeKey}
                  template={artifact.template as TemplateId}
                  result={result}
                />
```


The `ArtifactView` component is imported at the beginning of the `side-view.tsx` file:


```4:4:components/side-view.tsx
import { ArtifactView } from '@/components/artifact-view'
```


The actual implementation of the `ArtifactView` component is in a separate file, `components/artifact-view.tsx`. From the code snippets you provided, we can see the beginning of this component:


```1:34:components/artifact-view.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Terminal } from 'lucide-react'

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert'
import { ExecutionResult } from '@/app/api/sandbox/route'
import { TemplateId } from '@/lib/templates'

function LogsOutput({ stdout, stderr }: {
  stdout: string[]
  stderr: string[]
}) {
  if (stdout.length === 0 && stderr.length === 0) return null

  return (
    <div className="w-full h-32 max-h-32 overflow-y-auto flex flex-col items-start justify-start space-y-1 p-4 border-t">
      {stdout && stdout.length > 0 && stdout.map((out: string, index: number) => (
        <pre key={index} className="text-xs">
          {out}
        </pre>
      ))}
      {stderr && stderr.length > 0 && stderr.map((err: string, index: number) => (
        <pre key={index} className="text-xs text-red-500">
          {err}
        </pre>
      ))}
    </div>
  )
}
```


This component is responsible for rendering the artifact, which could be an image, code output, or an iframe depending on the type of artifact generated. It handles different types of results and displays them accordingly, including showing logs and error messages if they occur during artifact generation or execution.

The line you're referring to is part of the system prompt used in the chat API route. It's located in:


```43:43:app/api/chat/route.ts
    system: `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
```


This line is using the `templatesToPrompt` function to generate a string representation of the available templates. The `templatesToPrompt` function is defined in:


```8:10:lib/templates.ts
export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates).map(([id, t], index) => `${index + 1}. ${id}: "${t.instructions}". File: ${t.file || 'none'}. Dependencies installed: ${t.lib.join(', ')}. Port: ${t.port || 'none'}.`).join('\n')}`
}
```


This function takes the `templates` object and converts it into a formatted string that lists all available templates with their instructions, file paths, dependencies, and ports. This string is then included in the system prompt given to the AI model.

The `templates` object itself is imported from `templates.json`, which contains the detailed configuration for each template:


```1:53:lib/templates.json
{
  "code-interpreter-multilang": {
    "name": "Python data analyst",
    "lib": ["python", "jupyter", "numpy", "pandas", "matplotlib", "seaborn", "plotly"],
    "file": "script.py",
    "instructions": "Runs code as a Jupyter notebook cell. Strong data analysis angle. Can use complex visualisation to explain results.",
    "port": null
  },
  "nextjs-developer": {
    "name": "Next.js developer",
    "lib": ["nextjs@14.2.5", "typescript", "@types/node", "@types/react", "@types/react-dom", "postcss", "tailwindcss", "shadcn"],
    "file": "pages/index.tsx",
    "instructions": "A Next.js 13+ app that reloads automatically. Using the pages router.",
    "port": 3000
  },
  "vue-developer": {
    "name": "Vue.js developer",
    "lib": ["vue@latest", "nuxt@3.13.0", "tailwindcss"],
    "file": "app.vue",
    "instructions": "A Vue.js 3+ app that reloads automatically. Only when asked specifically for a Vue app.",
    "port": 3000
  },
  "streamlit-developer": {
    "name": "Streamlit developer",
    "lib": [
      "streamlit",
      "pandas",
      "numpy",
      "matplotlib",
      "request",
      "seaborn",
      "plotly"
    ],
    "file": "app.py",
    "instructions": "A streamlit app that reloads automatically.",
    "port": 8501
  },
  "gradio-developer": {
    "name": "Gradio developer",
    "lib": [
      "gradio",
      "pandas",
      "numpy",
      "matplotlib",
      "request",
      "seaborn",
      "plotly"
    ],
    "file": "app.py",
    "instructions": "A gradio app. Gradio Blocks/Interface should be called demo.",
    "port": 7860
  }
}
```


This structure allows the system to dynamically generate a prompt that informs the AI about all available templates, which the AI can then use to generate appropriate artifacts based on the user's request.

Yes, that's correct, Jason. Let me break it down more precisely:

1. The schema (defined in `lib/schema.ts`) acts as a blueprint for the structure of the artifact that the LLM needs to generate.

2. The system prompt, which includes the formatted template information, provides instructions to the LLM on how to create a payload that conforms to this schema. This prompt is constructed in the chat route handlers (`app/api/chat/route.ts` and `app/api/chat-o1/route.ts`).

3. The LLM uses these instructions to generate a response that includes all the necessary information (title, description, code, dependencies, etc.) as specified by the schema.

4. The `streamObject` function then parses this LLM output according to the schema, ensuring that the generated payload matches the expected structure.

5. This parsed payload (the artifact) is then used by the application to actually generate the artifact - setting up the sandbox, installing dependencies, writing code files, etc.

So you're absolutely right - the schema and the system prompt together instruct the LLM on how to create a structured payload that the application can then use to generate the actual artifact. The LLM isn't directly creating the artifact itself, but rather providing a detailed specification that the application uses to create the artifact.

Certainly, Jason. I'll analyze the differences between the two route files and explain when each is used.

The two files in question are:
1. `app/api/chat-o1/route.ts`
2. `app/api/chat/route.ts`

Key differences:

1. API Endpoint:
   - `chat-o1` is used for specific models (O1 models)
   - `chat` is used for other models

2. Text Generation:
   - `chat-o1` uses a two-step process: first generating text, then streaming an object
   - `chat` directly streams an object

3. Model Client:
   - `chat-o1` uses the model client for text generation, then uses OpenAI's GPT-4 for object streaming
   - `chat` uses the model client for both text generation and object streaming

4. Rate Limiting:
   - `chat-o1` uses a hardcoded rate limit
   - `chat` uses environment variables for rate limiting

5. System Prompt:
   - `chat-o1` adds a system prompt to the beginning of the messages
   - `chat` includes the system prompt in the streamObject call

Usage:

The `chat-o1` route is used specifically when the selected model is an O1 model. This can be seen in the `app/page.tsx` file:

```typescript
const { object, submit, isLoading, stop, error } = useObject({
  api: currentModel?.id === 'o1-preview' || currentModel?.id === 'o1-mini' ? '/api/chat-o1' : '/api/chat',
  schema,
  // ...
})
```

This code checks if the current model is either 'o1-preview' or 'o1-mini'. If so, it uses the '/api/chat-o1' endpoint. Otherwise, it defaults to the '/api/chat' endpoint.

The O1 models seem to require a different processing approach, which is why they have a separate route. The main differences are:

1. They use a two-step process for generating content.
2. They specifically use OpenAI's GPT-4 for the object streaming step.

The standard '/api/chat' route is used for all other models and provides a more straightforward, single-step process for generating and streaming content.

This separation allows for specialized handling of O1 models while maintaining a standard approach for other models, providing flexibility in the application's AI model usage.

Certainly, Jason. I'll walk you through the process of generating and sending instructions to the LLM, step by step, with the relevant code snippets.

1. User Input and Template Selection:
The process starts in the main page component (`app/page.tsx`) when the user submits a chat message:

```typescript:app/page.tsx
async function handleSubmitAuth (e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  if (!session) {
    return setAuthDialog(true)
  }

  if (isLoading) {
    stop()
  }

  const content: Message['content'] = [{ type: 'text', text: chatInput }]
  const images = await toMessageImage(files)

  if (images.length > 0) {
    images.forEach(image => {
      content.push({ type: 'image', image })
    })
  }

  const updatedMessages = addMessage({
    role: 'user',
    content,
  })

  submit({
    userID: session?.user?.id,
    messages: toAISDKMessages(updatedMessages),
    template: currentTemplate,
    model: currentModel,
    config: languageModel,
  })

  // ... (rest of the function)
}
```

2. Sending Request to API:
The `submit` function (from the `useObject` hook) sends a POST request to the `/api/chat` or `/api/chat-o1` route, depending on the selected model.

3. API Route Handler:
In the API route (`app/api/chat/route.ts` or `app/api/chat-o1/route.ts`), the request is processed:

```typescript:app/api/chat/route.ts
export async function POST(req: Request) {
  // ... (rate limiting code)

  const { messages, userID, template, model, config }: { messages: CoreMessage[], userID: string, template: Templates, model: LLMModel, config: LLMModelConfig } = await req.json()
  
  const { model: modelNameString, apiKey: modelApiKey, ...modelParams } = config
  const modelClient = getModelClient(model, config)

  const stream = await streamObject({
    model: modelClient as LanguageModel,
    schema,
    system: `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
    messages,
    mode: getDefaultMode(model),
    ...modelParams,
  })

  return stream.toTextStreamResponse()
}
```

4. Generating Template Instructions:
The `templatesToPrompt` function is called to generate a string representation of the available templates:

```typescript:lib/templates.ts
export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates).map(([id, t], index) => `${index + 1}. ${id}: "${t.instructions}". File: ${t.file || 'none'}. Dependencies installed: ${t.lib.join(', ')}. Port: ${t.port || 'none'}.`).join('\n')}`
}
```

5. Creating the System Prompt:
The system prompt is constructed by combining a base instruction with the template information:

```typescript:app/api/chat/route.ts
system: `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
```

6. Streaming to LLM:
The `streamObject` function is called with the constructed system prompt, user messages, and the artifact schema. This function handles the communication with the LLM and ensures the response conforms to the specified schema.

7. Processing LLM Response:
The LLM's response is streamed back to the client. The client-side code (in `app/page.tsx`) then processes this response and updates the UI accordingly.

8. Generating Artifact:
Once the LLM response is complete, another request is sent to `/api/sandbox` to actually create the artifact based on the LLM's output:

```typescript:app/page.tsx
const response = await fetch('/api/sandbox', {
  method: 'POST',
  body: JSON.stringify({
    artifact,
    userID: session?.user?.id,
    apiKey
  })
})
```

This process ensures that the LLM receives clear instructions on how to generate the artifact specification, which is then used by the application to create the actual artifact in a sandbox environment.

Certainly! Let's apply the `templatesToPrompt` function to the Next.js developer template. Here's how it would look:

```typescript
const templates = {
  "nextjs-developer": {
    "name": "Next.js developer",
    "lib": ["nextjs@14.2.5", "typescript", "@types/node", "@types/react", "@types/react-dom", "postcss", "tailwindcss", "shadcn"],
    "file": "pages/index.tsx",
    "instructions": "A Next.js 13+ app that reloads automatically. Using the pages router.",
    "port": 3000
  }
};

const prompt = templatesToPrompt(templates);
console.log(prompt);
```

The resulting prompt would be:

```
1. nextjs-developer: "A Next.js 13+ app that reloads automatically. Using the pages router.". File: pages/index.tsx. Dependencies installed: nextjs@14.2.5, typescript, @types/node, @types/react, @types/react-dom, postcss, tailwindcss, shadcn. Port: 3000.
```

This string would then be included in the system prompt sent to the LLM, providing it with the specific instructions and details for creating a Next.js application. The LLM would use this information to understand that it should:

1. Create a Next.js 13+ application
2. Implement auto-reloading functionality
3. Use the pages router (not the newer App Router)
4. Create the main file at `pages/index.tsx`
5. Include the specified dependencies in the project
6. Set up the application to run on port 3000

This information guides the LLM in generating appropriate code and configuration for a Next.js project that meets these specifications.

The terminal in this application runs client-side. Let me explain why:

1. Client-side implementation:
The Terminal component is implemented using XTerm.js, which is a front-end terminal emulator that runs in the browser. This is evident from the Terminal component code:

```typescript:components/Terminal.tsx
useEffect(function initialize() {
  async function init() {
    if (!terminalRef.current) return

    const xterm = await import('@xterm/xterm')

    const term = new xterm.Terminal({
      cursorStyle: 'block',
      fontSize: 13,
      theme: {
        background: '#000',
        foreground: '#FFFFFF',
        cursor: '#FFFFFF',
      },
      allowProposedApi: true,
    })

    const { FitAddon } = await import('@xterm/addon-fit')
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(terminalRef.current)

    // ... more client-side setup
  }

  const result = init()

  return () => {
    result.then(i => i?.dispose())
  }
}, [
  terminalRef,
  autofocus,
])
```

This code is running in the browser, creating and managing the terminal interface.

2. Connection to sandbox:
The terminal connects to the sandbox using the `useSandbox` and `useTerminal` hooks:

```typescript:components/Terminal.tsx
const { sandbox } = useSandbox(sandboxID)
const pty = useTerminal({
  sandbox,
  terminal: terminal?.terminal,
})
```

These hooks manage the connection between the client-side terminal and the remote sandbox.

3. WebSocket communication:
While not explicitly shown in the provided code snippets, this type of setup typically uses WebSocket connections to communicate between the client-side terminal and the server-side sandbox in real-time.

4. Server-side sandbox:
The actual sandbox environment runs on the server-side, as evidenced by the sandbox API route:

```typescript:app/api/sandbox/route.ts
export async function POST(req: Request) {
  // ... sandbox creation and setup
  let sbx: Sandbox | CodeInterpreter | undefined = undefined

  if (artifact.template === 'code-interpreter-multilang') {
    sbx = await CodeInterpreter.create({ /* ... */ })
  } else {
    sbx = await Sandbox.create(artifact.template, { /* ... */ })
  }
  // ... more server-side operations
}
```

This code runs on the server, creating and managing the sandbox environment.

In summary, the terminal interface itself runs client-side in the user's browser, providing a responsive and interactive experience. It communicates with a server-side sandbox environment, likely using WebSockets for real-time interaction. This architecture allows for a smooth, interactive terminal experience while keeping the actual execution environment secure on the server.