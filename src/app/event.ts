import {player} from './player'
import { Timestamp } from 'rxjs';

export interface Event {
    name : string;
    format : string;
    players : player[];
    timeStamp : string;
}
