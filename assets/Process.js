export default class Process {

    constructor(){
        console.log('process launched');
        this.current = [];
        this.chunk = [];
        this.deep = 0;
        this.tree = 0;
    }

    is(name){
        this.name = name;
    }

    get stackTrace(){
        return Array.isArray(this.current[0].from) ? [...this.current[0].from, this.current[0].name] : [this.current[0].from, this.current[0].name];
    }

    match(process){
        const otherNames = process.current.map(value => value.name);
        for(let value of this.current){
            if(otherNames.includes(value.name)){
                return true;
            }
        }
        return false;
    }

    next(){
        let current = this.getLayer(this.deep);
        current.forEach(value => {
            const from = value.from;
            const arr = this.current.filter(cv => cv.name === from);
            if(arr.length > 0){
                if(!Array.isArray(arr[0].from)){
                    arr[0].from = [arr[0].from];
                }
                value.from = [...arr[0].from, from];
            }
        });
        this.chunk = this.current;
        this.current = current;
        this.deep++;
    }

    getLayer(n){
        let arr = [];
        if(this.current.length === 0){
            this.current.push({
                from: '',
                name: this.name
            });
        }
        const currentNames = this.chunk.map(value => value.name);
        this.current.forEach(user => {
            if(!currentNames.includes(user.name)){
                arr = [...arr, ...this.getFollowers(user.name)]
            }
        });
        this.tree += arr.length;
        console.log(this.tree)
        return arr;
    }

    getFollowers(name){
        let arr = [];


        /**
         * Creating
         */

        const pairs = [
            ['Michael Smith', 'Joe Hanson'],
            ['Michael Smith', 'Bob Ward'],
            ['Michael Smith', 'James Fox'],

            ['Bob Ward', 'John Doe'],
            ['Bob Ward', 'Kevin Morton'],
            ['Bob Ward', 'Becky Maclin'],
            ['Bob Ward', 'Johnathon Saum'],
            ['Bob Ward', 'Pamela Perez'],
            ['Bob Ward', 'Diane Howard'],
            ['Bob Ward', 'Matthew Hupp'],
            ['Bob Ward', 'Isaac Robertson'],
            ['Bob Ward', 'Lillian Bingham'],

            ['James Fox', 'Shari Kirkland'],
            ['James Fox', 'Michael Franco'],
            ['James Fox', 'James Bullis'],
            ['James Fox', 'Bobby Donnellan'],
            ['James Fox', 'Patricia Peyton'],
            ['James Fox', 'Michael Johnson'],
            ['James Fox', 'Willie Whitson'],
            ['James Fox', 'Michiko Brookins'],
            ['James Fox', 'Gary Beckwith'],
            
            ['Bobby Donnellan', 'Sheila Cortez'],
            ['Bobby Donnellan', 'William Lopez'],
            ['Bobby Donnellan', 'Timothy Bent'],
            ['Bobby Donnellan', 'Veronica Villalvazo'],
            ['Bobby Donnellan', 'Rebecca Anderson'],
            ['Bobby Donnellan', 'Jack Short'],
            ['Bobby Donnellan', 'Stanley Jenkins'],
            ['Bobby Donnellan', 'Cynthia Pleas'],
            
            ['Joe Hanson', 'Ruth Pollock'],
            ['Ruth Pollock', 'Carlos Williford'],
            ['Carlos Williford', 'Joshua Eckhart'],
            ['Joshua Eckhart', 'Roger Parkey'],
            ['Roger Parkey', 'Pearl Smith'],
            ['Pearl Smith', 'Elaine Jackson'],
            ['Elaine Jackson', 'Shirley Cornelius']
        ];

        for(let a of pairs){
            arr.push({
                from: a[0],
                name: a[1]
            });
            arr.push({
                from: a[1],
                name: a[0]
            });
        }

        document.querySelector('#count').innerText = parseInt(document.querySelector('#count').innerText) + 1;
        
        return arr.filter(value => value.from === name);
    }

}