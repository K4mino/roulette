const ItemWidth = 200;

export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getPrizes = (allPrizes, prizesCount, winner, winnerPrizeId) => {
  let newPrizes = [];

  const setPrizeActors = (fromIndex, toIndex) => {
    let j = 0;
    const createdPrizes = [];

    for (let i = fromIndex; i <= toIndex; i += 1) {
      createdPrizes.push({ id: i, ...allPrizes[j] });
      j = j === allPrizes.length - 1 ? 0 : j + 1;
    }

    shuffle(createdPrizes);
    return createdPrizes;
  };

  if (allPrizes.length === 0) {
    throw new Error("Ошибка! Нет актёров.");
  }

  newPrizes = newPrizes.concat(setPrizeActors(0, winnerPrizeId - 1));
  newPrizes[winnerPrizeId] = { id: winnerPrizeId, ...winner };
  newPrizes = newPrizes.concat(
    setPrizeActors(winnerPrizeId + 1, prizesCount - 1)
  );

  return newPrizes;
};

export const spin = (winnerPrizeId, prizeWrapper) => {
  const elPrizeWidthHalf = Math.floor(ItemWidth / 2);
  const elPrizeWidthOneTwentieth = Math.floor(ItemWidth / 20);
  const randStop =
    (winnerPrizeId - 4) * ItemWidth +
    elPrizeWidthHalf +
    randomRange(elPrizeWidthOneTwentieth, 18 * elPrizeWidthOneTwentieth);

  prizeWrapper.current.style.transition = `left 10s ease-out`;

  setTimeout(() => {
    prizeWrapper.current.style.left = `-${randStop}px`;
  }, 100);
};
