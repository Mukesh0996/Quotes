import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import HighLightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../Hooks/httpHook';
import { getSingleQuote } from '../lib';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();  
    const {quoteId} = params;
    const { sendRequest, status, data: loadedQuote } = useHttp(getSingleQuote)
    console.log("match", match)
    useEffect(() => {
        sendRequest(quoteId);
    },[sendRequest, quoteId])
    
    const quote = loadedQuote;
    if(status ==="pending") {
        return <div className="centered"> <LoadingSpinner/> </div>
    }

    if(!loadedQuote) {
        return <NoQuotesFound/>
    }

    return <Fragment>
                <HighLightedQuote text={quote.text} author={quote.author} />
                <Route path={match.path} exact>
                    <div className="centered">
                        <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                    </div>
                </Route>
                <Route path={`${match.path}/comments`}>
                    <Comments/>
                </Route> 
           </Fragment>
}

export default QuoteDetail;