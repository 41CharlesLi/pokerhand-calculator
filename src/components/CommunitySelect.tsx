import React from "react";
import { MultiSelect } from "@mantine/core";

interface Card {
    value: string;
    label: string;
    player: string;
}

type CommunitySelectProps = {
    setCommunityCards: React.Dispatch<React.SetStateAction<string[]>>;
    cardDeck: Card[];
    setCardDeck: React.Dispatch<React.SetStateAction<Card[]>>;
};

function CommunitySelect({
    setCommunityCards,
    cardDeck,
    setCardDeck,
}: CommunitySelectProps) {
    const handleCardSelect = (cardDeck: Card[], cards: string[]) => {
        // we map over cardDeck, if the value matches the card selected, we add a string of "community"
        // else, we change to empty string
        const cardMap = cardDeck.map((card) => {
            if (cards.includes(card.value)) {
                card.player = "community";
            } else {
                // removes selected card from cardMap
                card.player = "";
            }
            return card;
        });

        setCardDeck(cardMap);
        setCommunityCards([...cards]);
    };

    const availableCards = cardDeck.filter((card) => {
        // only show cards that are labelled as community or empty string. SOOO "player 1" will not show
        return card.player !== ("commmunity" || "");
    });
    return (
        <MultiSelect
            data={availableCards}
            label="Community Cards"
            placeholder="Select your community cards"
            searchable
            nothingFound="Nothing found"
            maxSelectedValues={5}
            clearable
            onChange={(selectedArray) =>
                handleCardSelect(cardDeck, selectedArray)
            }
        />
    );
}

export default CommunitySelect;
