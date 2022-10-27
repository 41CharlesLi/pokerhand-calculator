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
    currentPlayer: string;
    players: object[];
    setPlayers: React.Dispatch<React.SetStateAction<object[]>>;
};

function PlayerSelect({
    cardDeck,
    currentPlayer,
    players,
    setPlayers,
}: PlayerSelectProps) {
    const [hand, setHand] = useState<string[]>([]);
    useEffect(() => {
        //   copy the players state
        //         loop over the array and if theres a key in the objects that matches the current player
        //         set their hand to the selectedArray
        //         setPlayers to arrCopy
        let arrCopy = [...players];
        for (let i = 0; i < arrCopy.length; i++) {
            for (let key in arrCopy[i]) {
                if (key === currentPlayer) {
                    let obj = { [`${currentPlayer}`]: [hand] };
                    arrCopy[i] = { [`${currentPlayer}`]: [...hand] };
                }
            }
        }
        setPlayers(arrCopy);
    }, [hand]);
    const handleSelect = (selectedArray: string[], currentPlayer: string) => {
        //copy the players state
        //loop over the array and if theres a key in the objects that matches the current player
        //set their hand to the selectedArray
        //setPlayers to arrCopy
        // let arrCopy = [...players];
        // for (let i = 0; i < arrCopy.length; i++) {
        //     for (let key in arrCopy[i]) {
        //         if (key === currentPlayer) {
        //             arrCopy[i] = { currentPlayer: [...selectedArray] };
        //         }
        //     }
        // }
        setHand(selectedArray);
        // setPlayers(arrCopy);
    };

    return (
        <MultiSelect
            data={cardDeck.filter((card) => {
                return card.selected !== true || card.player === currentPlayer;
            })}
            label="Player Hand"
            placeholder="Select your Hand"
            searchable
            nothingFound="Nothing found"
            maxSelectedValues={2}
            onChange={(selectedArray) => {
                handleSelect(selectedArray, currentPlayer);
            }}
            value={hand}
            clearable
        />
    );
}

export default PlayerSelect;
