export enum entityType {
  Car = 1,
  // Shifting (<<) 00000001 by 1 position to the left -> 00000010 
  User = 1 << 1
  // To add other types, shift by 2, 3 etc (ex. X = 1 << 2) 
}