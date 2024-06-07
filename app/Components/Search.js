'use client'
import React from "react";
import Button from '@mui/material/Button';
import { useState } from "react";

// herein we made use of a function initialised in fintab.js
export default function Search({ searchOpperation }) {
    const [input, setInput] = useState('');
    return (
        <div align="center">
            <ul>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={(event)=>{
                        if (event.keyCode === 13) {
                            searchOpperation(input);
                          }
                    }}
                />
            </ul>
            <ul>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => searchOpperation(input)}
                >
                    🔍</Button>
            </ul>
        </div>
    );
}