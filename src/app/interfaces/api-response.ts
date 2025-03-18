import { Character } from "./character";
import { Info } from "./info";

export interface ApiResponse {
    info: Info,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    results: Character[]
}
