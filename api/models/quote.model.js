const db = require('../data/database');
class  Quote{
    constructor() {
    }

    static async getRandomQuotes(){
        const quotes = await db.getDb().collection('quotes').find().toArray();
        const randomQuotesIndex = Math.floor(Math.random() *quotes.length);
        const randomQuotes = quotes[randomQuotesIndex].text;
        return randomQuotes;
    }
}

module.exports = Quote;