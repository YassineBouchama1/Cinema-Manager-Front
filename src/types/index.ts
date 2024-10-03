import { Movie } from "./movie";
import { ShowTime } from "./showTime";

export interface MovieData {
    data: Movie;
    showTimes: ShowTime[];
}