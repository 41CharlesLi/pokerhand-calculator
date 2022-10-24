import CommunitySelect from "./components/CommunitySelect";
import { useState, useEffect } from "react";
import Addplayer from "./components/Addplayer";

interface Player {
    player: number;
    hand: string[];
}
interface Card {
    value: string;
    label: string;
    player: string;
}
const cardData = [
    { value: "AS", label: "Ace of Spade", player: "" },
    { value: "AH", label: "Ace of Hearts", player: "" },
    { value: "AC", label: "Ace of Clover", player: "" },
    { value: "AD", label: "Ace of Diamonds", player: "" },
    { value: "KS", label: "King of Spade", player: "" },
    { value: "KH", label: "King of Hearts", player: "" },
    { value: "KC", label: "King of Clover", player: "" },
    { value: "KD", label: "King of Diamonds", player: "" },
    { value: "QS", label: "Queen of Spade", player: "" },
    { value: "QH", label: "Queen of Hearts", player: "" },
    { value: "QC", label: "Queen of Clover", player: "" },
    { value: "QD", label: "Queen of Diamonds", player: "" },
    { value: "JS", label: "Jack of Spade", player: "" },
    { value: "JH", label: "Jack of Hearts", player: "" },
    { value: "JC", label: "Jack of Clover", player: "" },
    { value: "JD", label: "Jack of Diamonds", player: "" },
    { value: "10S", label: "10 of Spade", player: "" },
    { value: "10H", label: "10 of Hearts", player: "" },
    { value: "10C", label: "10 of Clover", player: "" },
    { value: "10D", label: "10 of Diamonds", player: "" },
    { value: "9S", label: "9 of Spade", player: "" },
    { value: "9H", label: "9 of Hearts", player: "" },
    { value: "9C", label: "9 of Clover", player: "" },
    { value: "9D", label: "9 of Diamonds", player: "" },
    { value: "8S", label: "8 of Spade", player: "" },
    { value: "8H", label: "8 of Hearts", player: "" },
    { value: "8C", label: "8 of Clover", player: "" },
    { value: "8D", label: "8 of Diamonds", player: "" },
    { value: "7S", label: "7 of Spade", player: "" },
    { value: "7H", label: "7 of Hearts", player: "" },
    { value: "7C", label: "7 of Clover", player: "" },
    { value: "7D", label: "7 of Diamonds", player: "" },
    { value: "6S", label: "6 of Spade", player: "" },
    { value: "6H", label: "6 of Hearts", player: "" },
    { value: "6C", label: "6 of Clover", player: "" },
    { value: "6D", label: "6 of Diamonds", player: "" },
    { value: "5S", label: "5 of Spade", player: "" },
    { value: "5H", label: "5 of Hearts", player: "" },
    { value: "5C", label: "5 of Clover", player: "" },
    { value: "5D", label: "5 of Diamonds", player: "" },
    { value: "4S", label: "4 of Spade", player: "" },
    { value: "4H", label: "4 of Hearts", player: "" },
    { value: "4C", label: "4 of Clover", player: "" },
    { value: "4D", label: "4 of Diamonds", player: "" },
    { value: "3S", label: "3 of Spade", player: "" },
    { value: "3H", label: "3 of Hearts", player: "" },
    { value: "3C", label: "3 of Clover", player: "" },
    { value: "3D", label: "3 of Diamonds", player: "" },
    { value: "2S", label: "2 of Spade", player: "" },
    { value: "2H", label: "2 of Hearts", player: "" },
    { value: "2C", label: "2 of Clover", player: "" },
    { value: "2D", label: "2 of Diamonds", player: "" },
];

function App() {
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    const [playerCards, setPlayerCards] = useState<Player[]>([
        {
            player: 1,
            hand: [],
        },
        { player: 2, hand: [] },
    ]);
    const [cardDeck, setCardDeck] = useState<Card[]>(cardData);
    useEffect(() => {
        console.log(cardDeck);
    }, [cardDeck]);
    return (
        <div className="App">
            <h1>Poker Hand Calculator</h1>
            <CommunitySelect
                setCommunityCards={setCommunityCards}
                cardDeck={cardDeck}
                setCardDeck={setCardDeck}
            />
            <Addplayer
                playerCards={playerCards}
                setPlayerCards={setPlayerCards}
                cardDeck={cardDeck}
                setCardDeck={setCardDeck}
            />
        </div>
    );
}

export default App;
