export interface Eatery {
  _id: string;
  name: string;
  link?: string;
  menuType: string;
  neighborhood: string;
  isFoodCart: boolean;
  hasBrunch: boolean;
  cuisineType: string;
  favoriteDish: string;
  notes: string;
  isClosed: boolean;
}

export interface EateryWithId extends Eatery {
  id: string;
}
