export const getWikipediaTitle = async (placeName: string) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        placeName
    )}&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.query.search && data.query.search.length > 0) {
        return data.query.search[0].title.replace(/ /g, '_'); // Top result title
    }
    return null;
};


export const getPlaceImage = async (wikiTitle: string) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    for (const pageId in pages) {
        if (pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
    }
    return null;
};

export const searchWikidataEntity = async (query : string) => {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.search.length > 0) {
      return data.search[0].id; // e.g., Q9141
    }
    return null;
};

export const getWikidataImage = async (entityId :any) => {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    const entity = data.entities[entityId];
  
    // Check for image property (P18)
    if (entity?.claims?.P18?.[0]?.mainsnak?.datavalue?.value) {
      const filename = entity.claims.P18[0].mainsnak.datavalue.value;
      const encodedFilename = encodeURIComponent(filename.replace(/ /g, '_'));
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedFilename}`;
    }
  
    return null;
  };
  
  