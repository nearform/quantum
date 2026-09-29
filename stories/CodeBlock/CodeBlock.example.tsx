import { CodeBlock } from '@/index'
import type { CodeBlockProps } from '@/index'

const sample = `import { CodeBlock } from '@nearform/quantum'
const settings = {
    "model": "gpt-4",
    "temperature": 1,
    "maximumLength": 256,
    "stopSequences": "SQL",
    "topP": 1,
    "frequencyPenalty": 1,
    "presencePenalty": 1,
    "messages": [{
        "role": "system",
        "content": "Please use the userStory function provided"
    }]
}`

const longLine = `const message = 'A line this long does not wrap. The code block scrolls sideways instead, so the indentation of the code stays intact.'`

const CodeBlockDemo = (props: Omit<CodeBlockProps, 'children'>) => (
  <CodeBlock className="w-[32rem]" {...props}>
    {sample}
  </CodeBlock>
)

const CodeBlockWithoutLabel = () => (
  <CodeBlock className="w-[32rem]" language="ts">
    {sample}
  </CodeBlock>
)

const CodeBlockOverflow = () => (
  <CodeBlock className="w-[32rem]" label="Long line" language="ts">
    {longLine}
  </CodeBlock>
)

export { CodeBlockDemo, CodeBlockOverflow, CodeBlockWithoutLabel }
