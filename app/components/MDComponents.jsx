import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import synthwave84 from 'react-syntax-highlighter/dist/cjs/styles/prism/synthwave84';


const CustomImage = ({ src, children }) => {
  return (
    <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={children} className ="max-w-[80%] rounded-md"/>
    </>
  )
}

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={synthwave84}
        PreTag="div"
        showLineNumbers   // Add this line to enable line numbers
      lineNumberStyle={{
        paddingLeft: '10px',
        paddingRight: '10px',
        color:"red"
      }}
        customStyle={{
          backgroundImage:'transparent !important',
          backgroundColor: 'rgba(0, 0, 0, 0.2) !important',
          margin:"10px",
          borderRadius: "20px",
          padding: "10px",
          border: "3px solid rgba(0, 0, 0, 0.4)",
          overflow:"hidden"
        }}
        {...props}
      >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
    ) : (
      <code className={className} style={{background:"transparent !important"}}{...props}>
        {children}
      </code>
    );
  };
// Editing All Headers 
const Header1 = ({children})=>{
  return(
    <h1 className="ml-2 text-4xl font-bold my-2">{children}</h1>
  )
}
const Header2 = ({children})=>{
  return(
    <h2 className="ml-2 text-3xl font-bold my-2">{children}</h2>
  )
}
const Header3 = ({children})=>{
  return(
    <h3 className="ml-2 text-2xl font-bold my-2">{children}</h3>
  )
}
const Header4 = ({children})=>{
  return(
    <h4 className="ml-2 text-xl font-bold my-2">{children}</h4>
  )
}
const Header5 = ({children})=>{
  return(
    <h5 className="ml-2 text-lg font-bold my-2">{children}</h5>
  )
}
const Header6 = ({children})=>{
  return(
    <h6 className="ml-2 text-base font-bold my-2">{children}</h6>
  )
}
// Editing all Headers Ends Here 
const Paragraph = ({children})=>{
  return(
    <p className="p-1 text-base">{children}</p>
  )
}
const Anchor = ({children})=>{
  return(
    <a className="p-1 text-base my-2 cursor-pointer text-blue-600 underline">{children}</a>
  )
}
const UnorderedList = ({children})=>{
  return(
    <ul className="p-1 w-fit text-base my-2 list-disc">{children}</ul>
  )
}
const OrderedList = ({children})=>{
  return(
    <ol className="p-1 w-fit text-base my-2 list-decimal">{children}</ol>
  )
}
const ListItem = ({children})=>{
  return(
    <li className="p-1 rounded text-lg list-item">{children}</li>
  )
}
const HorizontalRule = ({children})=>{
  return(
    <hr className="p-1 my-2 bg-[#5a59597a]">{children}</hr>
  )
}
const Table = ({children})=>{
  return(
    <table className="table-auto border-collapse border border-gray-300 shadow-lg text-center my-2 rounded-lg">{children}</table>
  )
}
const TableHead = ({children})=>{
  return(

    <thead className='bg-[#cac0b0]'>{children}</thead>
  )
}
const TableBody = ({children})=>{
  return(
    <tbody className="p-1 text-base  ">{children}</tbody>
  )
}
const TableRow = ({children})=>{
  return(
    <tr className={`text-black p-1 [&:nth-child(odd)]:bg-[#FEFCFF]/50 [&:nth-child(even)]:bg-[#d2c7b4]/30`} >{children}</tr>
  )
}

const TableHeadCell = ({children})=>{
  return(
    <th className="border border-gray-300 py-1.5 px-2.5 p-1 text-lg font-semibold ">{children}</th>
  )
}
const TableCell = ({children})=>{
  return(
    <td className="border border-gray-300 py-1 px-1.5 p-1 text-base">{children}</td>
  )
}
const Emphasis = ({children})=>{
  return(
    <em className="p-1 text-base my-2">{children}</em>
  )
}
const Strong = ({children})=>{
  return(

    <strong className="p-1 text-base my-2">{children}</strong>
  )
}
const Strikethrough = ({children})=>{
  return(
    <del className="p-1 text-base my-2">{children}</del>
  )
}
const InlineCode = ({children})=>{
  return(
    <code className="p-1 text-base my-2">{children}</code>
  )
}
const Pre = ({children})=>{
  return(
    <pre className="p-1 text-base my-2">{children}</pre>
  )
}
const Break = ({children})=>{
  return(
    <br className="p-1 text-base my-2">{children}</br>
  )
}
const MDComponents = {
    img:CustomImage,
    code: CodeBlock,
    h1:Header1,
    h2:Header2,
    h3:Header3,
    h4:Header4,
    h5:Header5,
    h6:Header6,
    p:Paragraph,
    a:Anchor,
    ul:UnorderedList,
    ol:OrderedList,
    li:ListItem,
    hr:HorizontalRule,
    table:Table,
    thead:TableHead,
    tbody:TableBody,
    tr:TableRow,
    th:TableHeadCell,
    td:TableCell,
    em:Emphasis,
    strong:Strong,
    del:Strikethrough,
    inlineCode:InlineCode,
    pre:Pre,
    br:Break,
};

export default MDComponents;