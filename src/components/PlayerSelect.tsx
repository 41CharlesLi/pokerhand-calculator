import React, { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";

interface Card {
    value: string;
    label: string;
    player: string;
    selected: boolean;
}
type PlayerSelectProps = {
    cardDeck: Card[];
    setCardDeck: React.Dispatch<React.SetStateAction<Card[]>>;
    currentPlayer: string;
    players: object[];
    setPlayers: React.Dispatch<React.SetStateAction<object[]>>;
    required: boolean;
    handResults?: string;
};

function PlayerSelect({
    cardDeck,
    setCardDeck,
    currentPlayer,
    players,
    setPlayers,
    required,
    handResults,
}: PlayerSelectProps) {
    const [hand, setHand] = useState<string[]>([]);

    useEffect(() => {
        // create cardDeckcopy and loop
        // if handState includes card.value, set cardselected property to true and card.player to current player
        // if card.player is === current player and our hand state does not include card.value, set card.selected to false and card.player to ""
        let cardDeckCopy = [...cardDeck];
        cardDeckCopy.map((card) => {
            if (hand.includes(card.value)) {
                card.selected = true;
                card.player = currentPlayer;
            }
            if (card.player === currentPlayer && !hand.includes(card.value)) {
                card.selected = false;
                card.player = "";
            }
        });

        setCardDeck(cardDeckCopy);

        //   copy the players state
        //         loop over the array and if theres a key in the objects that matches the current player
        //         set their hand to the selectedArray
        //         setPlayers to arrCopy
        let arrCopy = [...players];
        for (let i = 0; i < arrCopy.length; i++) {
            for (let key in arrCopy[i]) {
                if (key === currentPlayer) {
                    arrCopy[i] = { [`${currentPlayer}`]: [...hand] };
                }
            }
        }
        setPlayers(arrCopy);
    }, [hand]);

    useEffect(() => {}, [hand]);

    const handleSelect = (selectedArray: string[]) => {
        setHand(selectedArray);
    };

    return (
        <div className="playerContainer">
            <MultiSelect
                data={cardDeck.filter((card) => {
                    return (
                        card.selected !== true || card.player === currentPlayer
                    );
                })}
                label={currentPlayer}
                placeholder="Select your Hand"
                searchable
                nothingFound="Nothing found"
                maxSelectedValues={2}
                onChange={(selectedArray) => {
                    handleSelect(selectedArray);
                }}
                value={hand}
                clearable
                required={required}
                className="playerInput"
            />
            <p>
                {currentPlayer}: {handResults?.replaceAll("_", " ")}
            </p>
        </div>
    );
}

export default PlayerSelect;
