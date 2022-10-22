import CommunitySelect from "./components/CommunitySelect";
import { useState } from "react";
import Addplayer from "./components/Addplayer";

function App() {
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    const [playerCards, setPlayerCards] = useState<object[]>([
        {
            player: 1,
            hand: [],
        },
        { player: 2, hand: [] },
    ]);

    console.log({ playerCards });
    console.log(communityCards);
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
