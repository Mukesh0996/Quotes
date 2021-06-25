const FIREBASE_URL = "https://quotes-a9bc5-default-rtdb.firebaseio.com/";

export const getAllQuotes = async() => {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Could not fetch quotes.');
      }

    let loadedQuotes = [];
    for(let key in responseData) {
        loadedQuotes.push({
            id: key,
            ...responseData[key]
        })
    }

    return loadedQuotes;
}

export const getSingleQuote = async (quoteID) => {

    const response = await fetch(`${FIREBASE_URL}/quotes/${quoteID}.json`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Could not fetch the quote .');
      }

      const loadedQuote = {
        id: quoteID,
        ...responseData,
      };

      return loadedQuote;
}

export const addQuote = async (quoteData) => {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`,{
        method:"POST", 
        body: JSON.stringify(quoteData),
        headers :{
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || "Could not create Quote..")
    }
}

export const getComments = async(quoteId) => {
    const response = await fetch(`${FIREBASE_URL}/comments/${quoteId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Could not get comments.');
      }
    
      const transformedComments = [];
      for(let key in responseData) {
          transformedComments.push({
              id: key,
              ...responseData[key]
          })
      }
      return transformedComments;
}

export const addComment = async(data) => {
    const response = await fetch(`${FIREBASE_URL}/comments/${data.quoteId}.json`,{
        method:"POST",
        body: JSON.stringify(data.commentData),
        headers: {
            'Content-Type':'application/json'
        }
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Could not add comment.');
    }
  
    return { commentId: responseData.name };

}