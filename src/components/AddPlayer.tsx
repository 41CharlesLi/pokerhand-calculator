import React, { useEffect, useState } from "react";
import { MultiSelect } from "@mantine/core";

interface Player {
    player: number;
    hand: string[];
}

interface Card {
    value: string;
    label: string;
    player: string;
}

type AddPlayerProps = {
    setPlayerCards: React.Dispatch<React.SetStateAction<Player[]>>;
    playerCards: Player[];
    cardDeck: Card[];
    setCardDeck: React.Dispatch<React.SetStateAction<Card[]>>;
};

const cardData = [
    { value: "AS", label: "Ace of Spade" },
    { value: "AH", label: "Ace of Hearts" },
    { value: "AC", label: "Ace of Clover" },
    { value: "AD", label: "Ace of Diamonds" },
    { value: "KS", label: "King of Spade" },
    { value: "KH", label: "King of Hearts" },
    { value: "KC", label: "King of Clover" },
    { value: "KD", label: "King of Diamonds" },
    { value: "QS", label: "Queen of Spade" },
    { value: "QH", label: "Queen of Hearts" },
    { value: "QC", label: "Queen of Clover" },
    { value: "QD", label: "Queen of Diamonds" },
    { value: "JS", label: "Jack of Spade" },
    { value: "JH", label: "Jack of Hearts" },
    { value: "JC", label: "Jack of Clover" },
    { value: "JD", label: "Jack of Diamonds" },
    { value: "10S", label: "10 of Spade" },
    { value: "10H", label: "10 of Hearts" },
    { value: "10C", label: "10 of Clover" },
    { value: "10D", label: "10 of Diamonds" },
    { value: "9S", label: "9 of Spade" },
    { value: "9H", label: "9 of Hearts" },
    { value: "9C", label: "9 of Clover" },
    { value: "9D", label: "9 of Diamonds" },
    { value: "8S", label: "8 of Spade" },
    { value: "8H", label: "8 of Hearts" },
    { value: "8C", label: "8 of Clover" },
    { value: "8D", label: "8 of Diamonds" },
    { value: "7S", label: "7 of Spade" },
    { value: "7H", label: "7 of Hearts" },
    { value: "7C", label: "7 of Clover" },
    { value: "7D", label: "7 of Diamonds" },
    { value: "6S", label: "6 of Spade" },
    { value: "6H", label: "6 of Hearts" },
    { value: "6C", label: "6 of Clover" },
    { value: "6D", label: "6 of Diamonds" },
    { value: "5S", label: "5 of Spade" },
    { value: "5H", label: "5 of Hearts" },
    { value: "5C", label: "5 of Clover" },
    { value: "5D", label: "5 of Diamonds" },
    { value: "4S", label: "4 of Spade" },
    { value: "4H", label: "4 of Hearts" },
    { value: "4C", label: "4 of Clover" },
    { value: "4D", label: "4 of Diamonds" },
    { value: "3S", label: "3 of Spade" },
    { value: "3H", label: "3 of Hearts" },
    { value: "3C", label: "3 of Clover" },
    { value: "3D", label: "3 of Diamonds" },
    { value: "2S", label: "2 of Spade" },
    { value: "2H", label: "2 of Hearts" },
    { value: "2C", label: "2 of Clover" },
    { value: "2D", label: "2 of Diamonds" },
];

function Addplayer({
    playerCards,
    setPlayerCards,
    cardDeck,
    setCardDeck,
}: AddPlayerProps) {
    const [hands, setHands] = useState<object>({});
    const [playerCount, setPlayerCount] = useState<number>(3);
    const [currentDeck, setCurrentDeck] = useState<Card[]>(cardDeck);

    useEffect(() => {
        const filteredDeck = cardDeck.filter((card) => {
            // only show cards that are labelled as community or empty string. SOOO "player 1" will not show

            if (card.player !== "community" || card.player.length === 0) {
                return card;
            }
        });

        setCurrentDeck(filteredDeck);
        console.log("firing");
        console.log(currentDeck);
    }, [cardDeck]);

    const addNewPlayer = () => {
        setPlayerCards([...playerCards, { player: playerCount, hand: [] }]);
        setPlayerCount(playerCount + 1);
    };

    const handleCardSelect = (
        selectedArray: string[],
        index: number,
        currentDeck: Card[],
        player: number
    ) => {
        let arrCopy = [...playerCards];
        arrCopy[index] = {
            player: index + 1,
            hand: [...selectedArray],
        };
        setPlayerCards(arrCopy);
        // we map over cardDeck, if the value matches the card selected, we add a string of "community"
        // else, we change to empty string
        const cardMap = currentDeck.map((card) => {
            if (selectedArray.includes(card.value)) {
                card.player = `player${index + 1}`;
            } else if (card.player !== "" || card.player.length !== 0) {
                return card;
            } else {
                // removes selected card from cardMap
                card.player = "";
            }
            return card;
        });
        setCardDeck(cardMap);
        setCurrentDeck(
            cardDeck.filter((card) => {
                // only show cards that are labelled as community or empty string. SOOO "player 1" will not show
                return card.player !== (`player${player}` || "" || "community");
            })
        );
    };

    // const availableCards = (player: number) =>
    //     cardDeck.filter((card) => {
    //         // only show cards that are labelled as community or empty string. SOOO "player 1" will not show
    //         return card.player != (`player${player}` || "");
    //     });

    // const availableCards = (player: number) =>
    //     setCurrentDeck(
    //         cardDeck.filter((card) => {
    //             // only show cards that are labelled as community or empty string. SOOO "player 1" will not show
    //             return card.player !== (`player${player}` || "");
    //         })
    //     );
    const availableCards = cardDeck.filter((card) => {
        // only show cards that are labelled as community or empty string. SOOO "player 1" will not show
        return card.player !== ("commmunity" || "");
    });

    useEffect(() => {
        setHands({});
    }, [cardDeck, currentDeck]);
    return (
        <>
            <div className="playersGrid">
                {playerCards.map((player, index) => {
                    //cards are being removed from the wrong player, cards are not showing in the multiselect
                    return (
                        <div className="player" key={player.player}>
                            <p>player: {player.player}</p>
                            <MultiSelect
                                data={currentDeck}
                                label="Player hand"
                                placeholder="Select your community cards"
                                searchable
                                nothingFound="Nothing found"
                                maxSelectedValues={2}
                                onChange={(selectedArray) =>
                                    handleCardSelect(
                                        selectedArray,
                                        index,
                                        currentDeck,
                                        player.player
                                    )
                                }
                                clearable
                            />
                        </div>
                    );
                })}
            </div>
            {playerCards.length <= 8 && (
                <button onClick={() => addNewPlayer()}>Add Player</button>
            )}
        </>
    );
}

export default Addplayer;
