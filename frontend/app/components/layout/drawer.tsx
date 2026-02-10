import { useState } from "react";

export default function Drawer({ main, expandedContent }: { main: React.ReactNode; expandedContent: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="cursor-pointer" onClick={toggleExpanded}>
            {main}
            {expanded && expandedContent}
        </div>
    )
}