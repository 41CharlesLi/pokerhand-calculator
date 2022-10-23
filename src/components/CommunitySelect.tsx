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
        const cardMap = cardDeck.map((card) => {
            if (cards.includes(card.value)) {
                card.player = "community";
            } else {
                card.player = "";
            }
            return card;
        });

        setCardDeck(cardMap);
        setCommunityCards([...cards]);
    };

    const availableCards = cardDeck.filter((card) => {
        return card.player !== ("commmunity" || "");
    });

    console.log({ cardDeck, availableCards });
    return (
        <div>
            <MultiSelect
                data={availableCards}
                label="Community Cards"
                placeholder="Select your community cards"
                searchable
                nothingFound="Nothing found"
                maxSelectedValues={5}
                clearable
                onChange={(string) => handleCardSelect(cardDeck, string)}
            />
        </div>
    );
}

export default CommunitySelect;
