const HOST = "server.com/";

// API library

const getFunc = ( url, data, cb ) => {
  const domain = url.substring( 0, url.indexOf( "/" ) );
  const endpoint = url.substring( url.indexOf( "/" ), url.length );

  cb && cb( endpoints[endpoint]["get"]( data ) );
};

const getRandomInteger = ( { min, max } ) => Math.floor( Math.random() * ( max - min + 1 ) ) + min;

const getRandomString = ( { length } ) => {
  const start = "a".charCodeAt( 0 );
  let result = "";
  for ( let i = 0; i < length; i++ ) {
    const random = getRandomInteger( { min: 0, max: 25 } );
    result += String.fromCharCode( start + random );
  }

  return result;
};

const generateSuggestion = prefix => {
  const RATIO_EXACT_MATCH = 0.3;
  const RATIO_AUTOCORRECT = 0.1;

  if ( Math.random() < RATIO_AUTOCORRECT ) {
    return {
      random: getRandomString( { length: getRandomInteger( { min: 1, max: prefix.length } ) } )
    };
  }

  if ( Math.random() < RATIO_EXACT_MATCH ) {
    return { prefix };
  }

  return {
    prefix,
    random: getRandomString( { length: getRandomInteger( { min: 1, max: 10 } ) } ),
  };
};

const getAutocompleteHandler = searchTerm => {
  const MAX_CHARS = 10;
  const NUM_AUTOCOMPLETE_RESULTS = 10;
  const RATIO_AUXILLARY_DATA = 0.1;

  if ( searchTerm.length <= 0 || searchTerm.length > MAX_CHARS ) return [];

  const results = [];
  while ( results.length < NUM_AUTOCOMPLETE_RESULTS ) {
    const result = generateSuggestion( searchTerm );

    let suggestion = '';
    if ( !result.prefix && result.random ) {
      suggestion = result.random;
    } else if ( result.prefix && result.random ) {
      suggestion = `${result.prefix}<b>${result.random}</b>`;
    } else if ( result.prefix && !result.random ) {
      suggestion = result.prefix;
    }

    if ( results.find( result => result.suggestion === `${result.prefix}${result.random}` ) ) {
      continue;
    }

    if ( Math.random() < RATIO_AUXILLARY_DATA ) {
      for ( let i = 0; i < 2; i++ ) {
        results.push( {
          suggestion,
          auxillary: getRandomString( {
            length: getRandomInteger( { min: 5, max: 15 } ),
          } ),
        } );
      }
    } else {
      results.push( {
        suggestion,
        auxillary: "",
      } );
    }
  }

  return results;
}

// Server

const api = {
  get: getFunc,
};

const endpoints = {
  "/": {
    "get": () => "hello world",
  },
  "/autocomplete": {
    "get": getAutocompleteHandler
  }
};

// Frontend

const searchInput = document.getElementsByClassName( "search__bar__input" )[0];

const createSuggestionElement = ( { suggestion, auxillary } ) => {
  const auxillaryStr = auxillary ? ` -- ${auxillary}` : "";
  const li = document.createElement( "li" );
  li.setAttribute( "class", "search__results__list__result" );
  li.innerHTML = `${suggestion}${auxillaryStr}`;

  return li;
}

const onSuggestionsResponse = results => {
  const suggestionsElement = document.getElementsByClassName( "search__results__list" )[0];
  if ( results.length <= 0 ) {
    suggestionsElement.classList.add( "search__results__list--hidden" );
  } else {
    suggestionsElement.innerHTML = "";
    suggestionsElement.classList.remove( "search__results__list--hidden" );
    suggestionsElement.append( ...results.map( r => createSuggestionElement( r ) ) );
  }
};

const onNewInput = e => {
  api.get( `${HOST}autocomplete`, searchInput.value, onSuggestionsResponse );
}

searchInput.oninput = onNewInput;