export class Movie {
    constructor(
        public id: number, 
        public backdrop_path: string, 
        public overview: string, 
        public original_title: string, 
        public title: string, 
        public release_date: string
        ){}
}

export class MovieFull {
    constructor(
        public subId: number, 
        public name: string, 
        public subscribed: boolean, 
        public img: string
        ){}
}