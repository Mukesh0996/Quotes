import { useEffect } from 'react';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../Hooks/httpHook';
import { getAllQuotes } from '../lib';

const Quotes = () => {

    const { sendRequest, error, data: loadedQuotes, status } = useHttp(getAllQuotes,true);
    useEffect(() => {
        sendRequest();
    },[sendRequest])

    if(status==="pending") {
        return <div className="centered">
            <LoadingSpinner/>
      </div>
    }


    if(status ==="error") {
        return <p className="centered focused">{error}</p>
    }
    if(status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound/>

    }
    
    return <QuoteList quotes={loadedQuotes} />
}

export default Quotes;