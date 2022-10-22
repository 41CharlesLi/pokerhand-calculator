import CommunitySelect from "./components/CommunitySelect";
import { useState } from "react";
import Addplayer from "./components/Addplayer";

interface Player {
    player: number;
    hand: string[];
}
function App() {
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    const [playerCards, setPlayerCards] = useState<Player[]>([
        {
            player: 1,
            hand: [],
        },
        { player: 2, hand: [] },
    ]);

    return (
        <div className="App">
            <CommunitySelect setCommunityCards={setCommunityCards} />
            <Addplayer
                playerCards={playerCards}
                setPlayerCards={setPlayerCards}
            />
        </div>
    );
}

export default App;

//have community card state
//
