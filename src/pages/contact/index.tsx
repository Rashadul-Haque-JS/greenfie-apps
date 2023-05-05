import Button from "@/components/experiments/Button";
import React, { useEffect, useState } from "react";

const QuerySection = () => {
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState("");
    const [letterCount, setLetterCount] = useState(0);

    const handleQueryChange = (e: any) => {
        const inputText = e.target.value;
        setQuery(inputText);
    };
      
    useEffect(() => {
        const letters = query.replace(/\s+/g, '').length;
        setLetterCount(letters);
    }, [query]);

    useEffect(()=>{
        console.log(email);
        
    },[])

    return (
        <div className="mt-12 w-3/4 mx-auto">
            <form>
                <div>
                <label htmlFor="email" className="font-bold mb-4">Your Email</label>
                <input
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2"
                    type="email"
                    id="query-email"
                    name="query-email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                />
                </div>
                <div className="mt-[24px]">
                <label htmlFor="query" className="font-bold mb-4">Your Query</label>
                <textarea
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg my-2 min-h-[240px]"
                    id="query"
                    name="query"
                    maxLength={601}
                    placeholder="Enter your query"
                    onChange={handleQueryChange}
                    required
                />
                <div className="flex justify-end">
                    <span className={`${letterCount === 600? 'text-rose-500':'text-gray-500'} text-sm`}>{letterCount}/ 600 characters</span>
                </div>
                </div>
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
};

export default QuerySection;
