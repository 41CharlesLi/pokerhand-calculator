import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import PlayerSelect from "./components/PlayerSelect";

interface Card {
    value: string;
    label: string;
    player: string;
    selected: boolean;
}
const cardData = [
    { value: "AS", label: "Ace of Spade", player: "", selected: false },
    { value: "AH", label: "Ace of Hearts", player: "", selected: false },
    { value: "AC", label: "Ace of Clover", player: "", selected: false },
    { value: "AD", label: "Ace of Diamonds", player: "", selected: false },
    { value: "KS", label: "King of Spade", player: "", selected: false },
    { value: "KH", label: "King of Hearts", player: "", selected: false },
    { value: "KC", label: "King of Clover", player: "", selected: false },
    { value: "KD", label: "King of Diamonds", player: "", selected: false },
    { value: "QS", label: "Queen of Spade", player: "", selected: false },
    { value: "QH", label: "Queen of Hearts", player: "", selected: false },
    { value: "QC", label: "Queen of Clover", player: "", selected: false },
    { value: "QD", label: "Queen of Diamonds", player: "", selected: false },
    { value: "JS", label: "Jack of Spade", player: "", selected: false },
    { value: "JH", label: "Jack of Hearts", player: "", selected: false },
    { value: "JC", label: "Jack of Clover", player: "", selected: false },
    { value: "JD", label: "Jack of Diamonds", player: "", selected: false },
    { value: "10S", label: "10 of Spade", player: "", selected: false },
    { value: "10H", label: "10 of Hearts", player: "", selected: false },
    { value: "10C", label: "10 of Clover", player: "", selected: false },
    { value: "10D", label: "10 of Diamonds", player: "", selected: false },
    { value: "9S", label: "9 of Spade", player: "", selected: false },
    { value: "9H", label: "9 of Hearts", player: "", selected: false },
    { value: "9C", label: "9 of Clover", player: "", selected: false },
    { value: "9D", label: "9 of Diamonds", player: "", selected: false },
    { value: "8S", label: "8 of Spade", player: "", selected: false },
    { value: "8H", label: "8 of Hearts", player: "", selected: false },
    { value: "8C", label: "8 of Clover", player: "", selected: false },
    { value: "8D", label: "8 of Diamonds", player: "", selected: false },
    { value: "7S", label: "7 of Spade", player: "", selected: false },
    { value: "7H", label: "7 of Hearts", player: "", selected: false },
    { value: "7C", label: "7 of Clover", player: "", selected: false },
    { value: "7D", label: "7 of Diamonds", player: "", selected: false },
    { value: "6S", label: "6 of Spade", player: "", selected: false },
    { value: "6H", label: "6 of Hearts", player: "", selected: false },
    { value: "6C", label: "6 of Clover", player: "", selected: false },
    { value: "6D", label: "6 of Diamonds", player: "", selected: false },
    { value: "5S", label: "5 of Spade", player: "", selected: false },
    { value: "5H", label: "5 of Hearts", player: "", selected: false },
    { value: "5C", label: "5 of Clover", player: "", selected: false },
    { value: "5D", label: "5 of Diamonds", player: "", selected: false },
    { value: "4S", label: "4 of Spade", player: "", selected: false },
    { value: "4H", label: "4 of Hearts", player: "", selected: false },
    { value: "4C", label: "4 of Clover", player: "", selected: false },
    { value: "4D", label: "4 of Diamonds", player: "", selected: false },
    { value: "3S", label: "3 of Spade", player: "", selected: false },
    { value: "3H", label: "3 of Hearts", player: "", selected: false },
    { value: "3C", label: "3 of Clover", player: "", selected: false },
    { value: "3D", label: "3 of Diamonds", player: "", selected: false },
    { value: "2S", label: "2 of Spade", player: "", selected: false },
    { value: "2H", label: "2 of Hearts", player: "", selected: false },
    { value: "2C", label: "2 of Clover", player: "", selected: false },
    { value: "2D", label: "2 of Diamonds", player: "", selected: false },
];

interface Card {
    value: string;
    label: string;
    player: string;
    selected: boolean;
}

interface indResult {
    cards: string;
    hand: string;
    result: string;
}

interface resultsObject {
    winners: indResult[];
    players: indResult[];
}

function App() {
    const [cardDeck, setCardDeck] = useState<Card[]>(cardData);
    const [communityCards, setCommunityCards] = useState<string[]>([]);
    const [playerCount, setPlayerCount] = useState<number>(3);
    const [players, setPlayers] = useState<object[]>([
        {
            "player 1": [],
        },
        {
            "player 2": [],
        },
    ]);
    const [fetchUrl, setFetchUrl] = useState<string>("");
    const [handResults, setHandResults] = useState<resultsObject>();
    const [winners, setWinners] = useState<string[]>([]);

    useEffect(() => {
        let url = "https://api.pokerapi.dev/v1/winner/texas_holdem?";
        let communitySearchValue = `cc=${communityCards.toString()}`;
        let playersSearchValue = "";
        players.forEach((player) => {
            let indPlayerSearchValue = `&pc[]=${Object.values(
                player
            ).toString()}`;
            playersSearchValue += indPlayerSearchValue;
        });
        console.log(playersSearchValue);
        setFetchUrl((url += communitySearchValue += playersSearchValue));
    }, [players, communityCards]);

    useEffect(() => {
        //when communityCards state changes, look through the cardDeck. If the card matches a value in community state, mark it as selected and set the player to 'community'
        let cardDeckCopy = [...cardDeck];
        cardDeckCopy.map((card) => {
            if (communityCards.includes(card.value)) {
                card.selected = true;
                card.player = "community";
            }
            if (
                // if the card is already marked as 'community' but the community state does not include the value, set selected to false and set player to empty string
                card.player === "community" &&
                !communityCards.includes(card.value)
            ) {
                card.selected = false;
                card.player = "";
            }
        });
        setCardDeck(cardDeckCopy);
    }, [communityCards]);

    const handleCommunitySelect = (selectedArray: string[]) => {
        setCommunityCards([...selectedArray]);
    };

    const addPlayer = () => {
        if (playerCount === 10) {
            return;
        }
        setPlayers([...players, { [`player ${playerCount}`]: [] }]);
        setPlayerCount(playerCount + 1);
    };

    const calculateWinner = (e: React.SyntheticEvent) => {
        e.preventDefault();
        for (let key in players) {
            let array = Object.values(players[key]);
            if (array[0].length !== 2 || communityCards.length !== 5) {
                alert("make sure you inputted all card values");
                return;
            }
        }
        fetch(fetchUrl)
            .then((response) => response.json())
            .then((results) => {
                setHandResults(results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        let prevWinners: string[] = [];
        if (handResults) {
            handResults.winners.map((winner) => {
                handResults.players.map((player, index) => {
                    if (player.cards === winner.cards) {
                        prevWinners.push(`${index + 1}`);
                    }
                });
            });
        }
        setWinners(prevWinners);
    }, [handResults]);

    return (
        <div className="App">
            <h1>Poker Hand Calculator</h1>
            <form onSubmit={(e) => calculateWinner(e)}>
                <MultiSelect
                    data={cardDeck.filter((card) => {
                        return (
                            card.selected !== true ||
                            card.player === "community"
                        );
                    })}
                    label="Community Cards"
                    placeholder="Select your community cards"
                    searchable
                    nothingFound="Nothing found"
                    maxSelectedValues={5}
                    onChange={(selectedArray) => {
                        handleCommunitySelect(selectedArray);
                    }}
                    value={communityCards}
                    clearable
                    required={true}
                />
                {players.map((player, index) => {
                    return (
                        <>
                            <PlayerSelect
                                cardDeck={cardDeck}
                                setCardDeck={setCardDeck}
                                currentPlayer={`player ${index + 1}`}
                                players={players}
                                setPlayers={setPlayers}
                                required={true}
                                // think about key
                                key={index}
                            />

                            {handResults && (
                                <p>
                                    Hand: {handResults["players"][index].result}
                                </p>
                            )}
                        </>
                    );
                })}
                <button>Calculate Winner</button>
            </form>

            <button onClick={() => addPlayer()}>Add Player</button>
            {winners &&
                winners.map((winner) => {
                    return <p>Player {winner} is the winner</p>;
                })}
        </div>
    );
}

export default App;
