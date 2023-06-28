import MDComponents from "./MDComponents"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReactToMarkDown({content}){
    return(
        <ReactMarkdown components={MDComponents} remarkPlugins={[remarkGfm]} suppressHydrationWarning>{content}</ReactMarkdown>
    )
}