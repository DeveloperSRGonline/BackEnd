# Backend Day 23
### problem with our project
**IMPORTANT:** It is not real time.
### Now we will create the full flaged ai like `GPT`
- Rag bhi use kar rahe honge.
- **MCP** ko bhi use karenge.
- **LLM** ye real time ka data nahi de sakta is liye hum use karte hai `MCP` like tools.

`LLM` ke pass ek restriction hai ki vo aaj kya ho raha hai .
`MCP` kya karta hai hamein ye realtime data access karne ka feature provide karta hai.

> Types of mcp server
- stdio
- stremable http
- SSE

---

> abhi ke liye hum `stdio` wala use karenge

`EJS` - frontend directly write using `Express`

**Express** ki madat se hum puri fullstack app create kar sakte hai

`EJS` - support server side rendering - content pura html me hi milta hai

`Client Side Rendering` - aapko ek blank html milegi and jo content hoga vo js se aa raaha hota 