var $dWO0L$axios = require("axios");
var $dWO0L$cheerio = require("cheerio");
var $dWO0L$microdatanode = require("microdata-node");
var $dWO0L$iso8601duration = require("iso8601-duration");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $53ffd25df6034fb9$export$2e2bcd8739ae039);



const $6454f78a158d7c99$var$isLoggingEnabled = false;
const $6454f78a158d7c99$var$logger = (...args)=>{
    if ($6454f78a158d7c99$var$isLoggingEnabled) console.log(...args);
};
var $6454f78a158d7c99$export$2e2bcd8739ae039 = $6454f78a158d7c99$var$logger;


const $e2842c7d73c005fd$export$591c171472a79b10 = (prospectiveProperties)=>{
    const { url: url , name: name , image: image , photo: photo , thumbnailUrl: thumbnailUrl , description: description , cookTime: cookTime , prepTime: prepTime , totalTime: totalTime , recipeYield: recipeYield , yield: rYield , recipeIngredients: recipeIngredients , recipeIngredient: recipeIngredient , ingredients: ingredients , ingredient: ingredient , recipeInstructions: recipeInstructions , instructions: instructions , step: step , recipeCategory: recipeCategory , recipeCuisine: recipeCuisine , recipeType: recipeType , keywords: keywords , tag: tag ,  } = prospectiveProperties;
    if (step) // didn't find any recipes that use step
    (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("buildRecipeModel:may need extra parsing for step property");
    // consolidate the properties into new model
    return {
        url: url,
        name: name,
        image: image || photo || thumbnailUrl,
        description: description,
        cookTime: cookTime,
        cookTimeOriginalFormat: cookTime,
        prepTime: prepTime,
        prepTimeOriginalFormat: prepTime,
        totalTime: totalTime,
        totalTimeOriginalFormat: totalTime,
        recipeYield: recipeYield || rYield,
        recipeIngredients: recipeIngredient || recipeIngredients || ingredients || ingredient,
        recipeInstructions: recipeInstructions || instructions || step,
        recipeCategories: recipeCategory,
        recipeCuisines: recipeCuisine,
        recipeTypes: recipeType,
        keywords: keywords || tag
    };
};
var $e2842c7d73c005fd$export$2e2bcd8739ae039 = $e2842c7d73c005fd$export$591c171472a79b10;



function $144a7991d584a9d5$var$transformImage(value) {
    if (typeof value === "string") return value;
    if (value.url) return value.url;
    if (Array.isArray(value)) return value[0];
    (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("image in another format", value);
    return value;
}
var $144a7991d584a9d5$export$2e2bcd8739ae039 = $144a7991d584a9d5$var$transformImage;



function $755bc37019a86a08$var$transformToList(value, key) {
    if (typeof value === "string") {
        if (value.includes(",")) return value.split(",").map((item)=>item.trim());
        return [
            value
        ];
    }
    if (Array.isArray(value)) return value;
    (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("another format needed", key);
    return value;
}
var $755bc37019a86a08$export$2e2bcd8739ae039 = $755bc37019a86a08$var$transformToList;



function $41b0a91bab7196ea$var$transformToString(value, key) {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value[0];
    (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("another format needed", key);
    return value;
}
var $41b0a91bab7196ea$export$2e2bcd8739ae039 = $41b0a91bab7196ea$var$transformToString;





function $969d76d57b183638$export$2e2bcd8739ae039(dateObj = {}) {
    let date = "";
    if (dateObj.days) date += dateObj.days > 1 ? `${dateObj.days} days ` : `${dateObj.days} day `;
    if (dateObj.hours) date += dateObj.hours > 1 ? `${dateObj.hours} hours ` : `${dateObj.hours} hour `;
    if (dateObj.minutes) date += dateObj.minutes > 1 ? `${dateObj.minutes} minutes ` : `${dateObj.minutes} minute `;
    if (dateObj.seconds) date += dateObj.seconds > 1 ? `${dateObj.seconds} seconds ` : `${dateObj.seconds} second `;
    return date.trim();
}


function $120d3617ec0b476c$var$transformToTime(value, key) {
    const time = (0, $41b0a91bab7196ea$export$2e2bcd8739ae039)(value);
    try {
        const parsedISODuration = (0, $dWO0L$iso8601duration.parse)(time);
        if (parsedISODuration) return (0, $969d76d57b183638$export$2e2bcd8739ae039)(parsedISODuration);
    } catch (error) {
        // fail silently and return original time
        (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(`ISO date parsing failure for ${key}`);
    }
    return time;
}
var $120d3617ec0b476c$export$2e2bcd8739ae039 = $120d3617ec0b476c$var$transformToTime;


const $9cf47aca6eaf3068$export$72258c3167c86bf = /<[^>]*>?/gm;
const $9cf47aca6eaf3068$export$6e02d1672746f58a = /(\r\n|\n|\r)/gm;
const $9cf47aca6eaf3068$export$dbf4950c590e9c3 = /&nbsp;|\s\s+/gm; // or &nbsp;


function $1f51bc7652160606$export$2e2bcd8739ae039(str) {
    return str.replace((0, $9cf47aca6eaf3068$export$72258c3167c86bf), "") // remove html
    .replace((0, $9cf47aca6eaf3068$export$6e02d1672746f58a), " ") // replace line breaks with spaces
    .replace((0, $9cf47aca6eaf3068$export$dbf4950c590e9c3), " ") // replace multiple spaces with single spaces
    .trim();
}



function $0c18b6482b67eb6f$var$transformToCleanString(value, key) {
    return (0, $1f51bc7652160606$export$2e2bcd8739ae039)((0, $41b0a91bab7196ea$export$2e2bcd8739ae039)(value, key));
}
var $0c18b6482b67eb6f$export$2e2bcd8739ae039 = $0c18b6482b67eb6f$var$transformToCleanString;




function $6dcba656e7e56349$var$transformInstructions(value) {
    if (typeof value === "string") {
        const cleanedValue = (0, $1f51bc7652160606$export$2e2bcd8739ae039)(value);
        if (cleanedValue.includes(".,")) // special case for kingarthurflour.com
        return cleanedValue.split(".,").map((item)=>item.trim());
        return [
            cleanedValue
        ];
    }
    if (Array.isArray(value)) {
        // microdata
        const firstItem = value[0];
        if (typeof firstItem === "string") return value.map((item)=>(0, $1f51bc7652160606$export$2e2bcd8739ae039)(item)); // loop through items and clean
        // json ld
        return value.map((item)=>{
            if (item.text) return (0, $1f51bc7652160606$export$2e2bcd8739ae039)(item.text);
            else (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("recipe instructions array has different format", value);
        });
    }
}
var $6dcba656e7e56349$export$2e2bcd8739ae039 = $6dcba656e7e56349$var$transformInstructions;



const $3ac75a9ba1462107$var$cleanIngredientAmounts = (line)=>line.replace(/¼/g, "1/4").replace(/½/g, "1/2").replace(/¾/g, "3/4").replace(/⅔/g, "2/3").replace((0, $9cf47aca6eaf3068$export$72258c3167c86bf), "").replace((0, $9cf47aca6eaf3068$export$dbf4950c590e9c3), " ").trim();
var $3ac75a9ba1462107$export$2e2bcd8739ae039 = $3ac75a9ba1462107$var$cleanIngredientAmounts;



const $cfa59f7728438ccd$var$transformIngredients = (value)=>{
    // jsonld
    if (value && typeof value[0] === "string") return value.map((item)=>(0, $3ac75a9ba1462107$export$2e2bcd8739ae039)(item));
    // array of objects (microdata)
    const mappedItems = [];
    Object.entries(value).forEach(([, item])=>{
        if (item.properties) {
            const { name: name , amount: amount  } = item.properties;
            if (name || amount) {
                const _name = name && name[0];
                const _amount = amount && amount[0];
                const singleLine = _amount ? `${_amount} ${_name}` : _name;
                mappedItems.push((0, $3ac75a9ba1462107$export$2e2bcd8739ae039)(singleLine));
            }
        }
    });
    // log issue
    if (mappedItems.length) return mappedItems;
    (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("transformIngredients:microdata:item without properties", value);
    return [];
};
var $cfa59f7728438ccd$export$2e2bcd8739ae039 = $cfa59f7728438ccd$var$transformIngredients;


const $b943688c869eaeb9$var$propertyTransformerMap = {
    name: (0, $41b0a91bab7196ea$export$2e2bcd8739ae039),
    image: (0, $144a7991d584a9d5$export$2e2bcd8739ae039),
    description: (0, $0c18b6482b67eb6f$export$2e2bcd8739ae039),
    cookTime: (0, $120d3617ec0b476c$export$2e2bcd8739ae039),
    prepTime: (0, $120d3617ec0b476c$export$2e2bcd8739ae039),
    totalTime: (0, $120d3617ec0b476c$export$2e2bcd8739ae039),
    cookTimeOriginalFormat: (0, $41b0a91bab7196ea$export$2e2bcd8739ae039),
    prepTimeOriginalFormat: (0, $41b0a91bab7196ea$export$2e2bcd8739ae039),
    totalTimeOriginalFormat: (0, $41b0a91bab7196ea$export$2e2bcd8739ae039),
    recipeYield: (0, $41b0a91bab7196ea$export$2e2bcd8739ae039),
    recipeIngredients: (0, $cfa59f7728438ccd$export$2e2bcd8739ae039),
    recipeInstructions: (0, $6dcba656e7e56349$export$2e2bcd8739ae039),
    recipeCategories: (0, $755bc37019a86a08$export$2e2bcd8739ae039),
    recipeCuisines: (0, $755bc37019a86a08$export$2e2bcd8739ae039),
    recipeTypes: (0, $755bc37019a86a08$export$2e2bcd8739ae039),
    keywords: (0, $755bc37019a86a08$export$2e2bcd8739ae039)
};
var $b943688c869eaeb9$export$2e2bcd8739ae039 = $b943688c869eaeb9$var$propertyTransformerMap;


const $4ff9688326398dfb$var$buildRecipeModel = (prospectiveProperties)=>{
    const recipe = (0, $e2842c7d73c005fd$export$2e2bcd8739ae039)(prospectiveProperties);
    // parse and transform the property values
    const transformedRecipe = {};
    Object.entries(recipe).forEach(([key, value])=>{
        const propertyTransformer = (0, $b943688c869eaeb9$export$2e2bcd8739ae039)[key];
        if (propertyTransformer && value) transformedRecipe[key] = propertyTransformer(value, key);
    });
    return transformedRecipe;
};
var $4ff9688326398dfb$export$2e2bcd8739ae039 = $4ff9688326398dfb$var$buildRecipeModel;



/*
  class to be extended by scraper classes
    the following must be implemented by the child class:
      testForMetadata:
        this function scrapes the type of metadata particular to the class
        and assigns the data to this.meta
      findRecipeItem
        this function should parse the metadata and assign recipe item to this.recipeItem
*/ class $7ef46ded656a71f4$var$Scraper {
    constructor(chtml){
        this.chtml = chtml;
        this.meta = null;
        this.recipeItem = null;
        if (!this.testForMetadata) throw {
            message: "testForMetadata function must be implemented by child class"
        };
        if (!this.findRecipeItem) throw {
            message: "findRecipeItem function must be implemented by child class"
        };
    }
    getRecipe() {
        this.testForMetadata();
        if (!this.meta) throw {
            message: "no meta data was found",
            type: this.type
        };
        this.findRecipeItem();
        if (!this.recipeItem) throw {
            message: "found metadata, but no recipe information",
            type: this.type
        };
        try {
            this.finalRecipe = (0, $4ff9688326398dfb$export$2e2bcd8739ae039)(this.recipeItem);
            return this.finalRecipe;
        } catch (error) {
            throw {
                message: "found recipe information, there was a problem with mapping the data",
                type: this.type
            };
        }
    }
    print() {
        if (this.recipeItem) {
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(" - - - - - - - - - - - - ");
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("original recipe data");
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(`type: ${this.type}`);
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(this.recipeItem);
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(" - - - - - - - - - - - - ");
        }
        if (this.finalRecipe) {
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(" ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ");
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("transformed recipe data");
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(this.finalRecipe);
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)(" ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ");
        }
    }
}
var $7ef46ded656a71f4$export$2e2bcd8739ae039 = $7ef46ded656a71f4$var$Scraper;


class $7634dd000d98dfbc$var$MicrodataScraper extends (0, $7ef46ded656a71f4$export$2e2bcd8739ae039) {
    constructor(chtml){
        super(chtml);
        this.type = "microdata";
    }
    testForMetadata() {
        const meta = (0, ($parcel$interopDefault($dWO0L$microdatanode))).toJson(this.chtml.html());
        if (!meta || !meta.items || !meta.items[0]) return;
        this.meta = meta;
    }
    findRecipeItem() {
        const recipe = Object.values(this.meta.items).find((item)=>item.type[0].indexOf("Recipe") > -1);
        this.recipeItem = recipe ? recipe.properties : null;
    }
}
var $7634dd000d98dfbc$export$2e2bcd8739ae039 = $7634dd000d98dfbc$var$MicrodataScraper;




class $26c27a7d024aaca7$var$JsonLdScraper extends (0, $7ef46ded656a71f4$export$2e2bcd8739ae039) {
    constructor(chtml){
        super(chtml);
        this.type = "jsonld";
    }
    testForMetadata() {
        var json = [];
        const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');
        Object.entries(jsonLdFromHtml).forEach(([, item])=>{
            let contents;
            try {
                if (item && item.children && item.children[0] && item.children[0].data) contents = JSON.parse(item.children[0].data);
            } catch (e) {
                (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("JsonLd: error parsing the json data", e);
                // Fail silently, in case there are valid tags
                return;
            }
            if (contents) json.push(contents);
        });
        if (json.length === 0) {
            (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("Error: No JSON-LD valid script tags present on page");
            return;
        }
        this.meta = json.length > 1 ? json : json[0];
    }
    findRecipeItem() {
        if (this.meta["@type"] === "Recipe") {
            // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
            this.recipeItem = this.meta;
            return;
        }
        // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
        // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
        const graphLevel = this.meta["@graph"] || this.meta;
        this.recipeItem = Object.values(graphLevel).find((item)=>item["@type"] === "Recipe");
    }
}
var $26c27a7d024aaca7$export$2e2bcd8739ae039 = $26c27a7d024aaca7$var$JsonLdScraper;



const $53ffd25df6034fb9$var$errorMessage = "Could not find recipe data";
var $53ffd25df6034fb9$export$2e2bcd8739ae039 = async (url)=>{
    let chtml;
    try {
        // load html from scraped url
        const resp = await (0, ($parcel$interopDefault($dWO0L$axios)))(url);
        chtml = (0, $dWO0L$cheerio.load)(resp.data);
    } catch (error) {
        throw new Error($53ffd25df6034fb9$var$errorMessage);
    }
    try {
        // attempt to find JsonLd data, return recipe or log and continue
        const jsonLdScraper = new (0, $26c27a7d024aaca7$export$2e2bcd8739ae039)(chtml);
        const recipe = jsonLdScraper.getRecipe();
        return {
            ...recipe,
            url: url
        };
    } catch (error1) {
        (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("main:JsonLdScraper", {
            error: error1,
            url: url
        });
    }
    // attempt to find microdata, return recipe or log and continue
    try {
        const microdataScraper = new (0, $7634dd000d98dfbc$export$2e2bcd8739ae039)(chtml);
        const recipe1 = microdataScraper.getRecipe();
        return {
            ...recipe1,
            url: url
        };
    } catch (error2) {
        (0, $6454f78a158d7c99$export$2e2bcd8739ae039)("main:MicrodataScraper", {
            error: error2,
            url: url
        });
    }
    // could add a Scraper for rdfa in the future
    // throw if no recipe found
    throw new Error($53ffd25df6034fb9$var$errorMessage);
};


//# sourceMappingURL=index.js.map
