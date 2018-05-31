import {player} from './player'

export interface Event {
    name : string;
    format : string;
    players : player[];
}
