import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Game } from "../models/game.model";

@Injectable({
    providedIn: 'root'
})
export class FireStoreService {
    private gamesCollection: AngularFirestoreCollection<Game> | null = null;
    private currentGameCollection: AngularFirestoreCollection<Game> | null = null;

    public games: Observable<Game[]> | null = null;
    public currentGame: Observable<Game> | null = null;

    constructor(private firestore: AngularFirestore) {
    }

    public connectToStore(id: string): void {
        this.gamesCollection = this.firestore.collection(id);
        this.games = this.gamesCollection.valueChanges();
        // this.currentGameCollection = this.firestore.collection(id);
        // this.currentGame = this.currentGameCollection.valueChanges();
    }
}