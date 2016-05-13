var LegislatorDB = function(){
    this.legislators = [];
    this.nextId = 1;
};

LegislatorDB.prototype = {

    // lookup by id
    find: function(id){
        var legislator = this.legislators.filter(function(legislator){
            return legislator.id == id;
        })[0];
        if(legislator == null){
            throw new Error('Legislator not found');
        }
        return legislator;
    },

    // field-specific filtering
    _filter: function(legislator, key, value){
        switch(key){
            case 'name':
                return RegExp(value.split(' ').join('.*'), 'gi').test(legislator[key])
                break;
            case 'district':
                return parseInt(value) == legislator[key];
                break;
            // case 'state':
            default:
                return legislator[key].toLowerCase() == value.toLowerCase();
                break;
        }
    },

    // filter by all fields specified in query string
    filter: function(params){
        var self = this, legislators = self.findAll();
        for(var key in params){
            // todo: make sure key is a valid legislator field.
            legislators = legislators.filter(function(legislator){
                return self._filter(legislator, key, params[key]);
            });
        }
        return legislators;
    },

    // wholesale
    findAll: function(){
        return this.legislators;
    },

    // save a legislator
    save: function (legislator) {

        // basic validation.
        var validKeys = ['id', 'name', 'state', 'district', 'political_party',
            'term_starts_on', 'term_ends_on'];

        for(var key in legislator){
            if(validKeys.indexOf(key) == -1){
                throw new Error('Invalid key: ' + key);
            }
        }

        var states = /^(AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;

        if(!states.test(legislator.state, 'i')){
            throw new Error('Invalid state: ' + legislator.state + '. `state` must be a two-letter state abbreviation representing a US state.');
        }

        if(isNaN(parseInt(legislator.district))){
            throw new Error('Invalid district: ' + legislator.district + '. `district` must be numeric.');
        }

        // todo: API call to govtrack.us to make sure `state` has an LD called `district`

        // todo: permits the year 4000, which might not be useful / valid (yet)
        var dateRegex = new RegExp('^\\\d{4}\-\\\d{2}\-\\\d{2}$');
        var dateKeys = ['term_starts_on', 'term_ends_on'];
        for(var key in dateKeys){
            if(!dateRegex.test(legislator[dateKeys[key]])){
                throw new Error('Invalid ' + dateKeys[key] + ': `' + dateKeys[key] + '` must be formatted YYYY-MM-DD')
            }
        }

        if (legislator.id == null || legislator.id == 0) {
            legislator.id = this.nextId;
            this.legislators.push(legislator);
            this.nextId++;
        } else {
            var index = null;
            this.legislators.forEach(function(item, key){
                if(item.id == legislator.id){
                    index = key;
                }
            });
            if(index == null){
                throw new Error('Could not find legislator with id ' + legislator.id);
            }
            this.legislators[index] = legislator;
        }

    }
};

module.exports = LegislatorDB;