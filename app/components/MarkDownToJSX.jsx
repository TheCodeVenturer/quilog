import MDComponents from "./MDComponents"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkDownToJSX({content}){
    return(
        <ReactMarkdown components={MDComponents} remarkPlugins={[remarkGfm]} suppressHydrationWarning={true}>{content}</ReactMarkdown>
    )
}