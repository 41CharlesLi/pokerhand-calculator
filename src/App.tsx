import CommunitySelect from "./components/CommunitySelect";
import { useState } from "react";

function App() {
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    console.log(communityCards);
    return (
        <div className="App">
            <CommunitySelect setCommunityCards={setCommunityCards} />
        </div>
    );
}

export default App;

//have community card state
//
