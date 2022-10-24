import React, { useEffect, useState } from "react";
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
    const [communityCardValues, setCommunityCardValues] = useState<string[]>(
        []
    );

    const handleCardSelect = (cardDeck: Card[], selectedArray: string[]) => {
        const cardMap = cardDeck.map((card) => {
            //map over cardDeck. If our communitycardValues includes the value already, remove it
            if (communityCardValues.includes(card.value)) {
                communityCardValues.filter((element) => element !== card.value);
            }

            // if the cardDeck includes the value being added, add a player value of "community"
            if (selectedArray.includes(card.value)) {
                card.player = "community";
            } else if (card.player === "community") {
                card.player = "";
            }
            return card;
        });
        setCommunityCardValues([...selectedArray]);
        setCardDeck(cardMap);
    };

    // whenever communityCardValues change, update communityCard state in parent
    useEffect(() => {
        setCommunityCards(communityCardValues);
    }, [communityCardValues]);

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
            value={communityCardValues}
        />
    );
}

export default CommunitySelect;
